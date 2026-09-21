import { useId, type ReactNode } from "react";
import Cursor from "./Cursor";

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "function"
  | "type"
  | "number"
  | "tag"
  | "plain"
  | "punct";

interface Token {
  text: string;
  type: TokenType;
}

interface CodeWindowProps {
  code: string;
  filename?: string;
  className?: string;
  theme?: "light" | "dark";
  showCursor?: boolean;
  action?: ReactNode;
}

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "return",
  "const",
  "let",
  "function",
  "interface",
  "extends",
  "typeof",
  "type",
  "as",
  "new",
  "null",
  "true",
  "false",
  "if",
  "else",
]);

const FUNCTION_NAMES = new Set(["useRef", "useInView", "FadeUp"]);

const TYPE_NAMES = new Set([
  "PropsWithChildren",
  "FadeUpProps",
  "HTMLDivElement",
  "ReactNode",
]);

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: "tok-keyword",
  string: "tok-string",
  comment: "tok-comment",
  function: "tok-function",
  type: "tok-type",
  number: "tok-number",
  tag: "tok-tag",
  plain: "tok-plain",
  punct: "tok-punct",
};

function pushKeyword(tokens: Token[], text: string) {
  if (KEYWORDS.has(text)) tokens.push({ text, type: "keyword" });
  else if (FUNCTION_NAMES.has(text)) tokens.push({ text, type: "function" });
  else if (TYPE_NAMES.has(text)) tokens.push({ text, type: "type" });
  else tokens.push({ text, type: "plain" });
}

function consumeString(tokens: Token[], code: string, start: number) {
  const quote = code[start];
  let i = start + 1;
  while (i < code.length) {
    if (code[i] === "\\") i += 2;
    else if (code[i] === quote) {
      i += 1;
      break;
    } else i += 1;
  }
  tokens.push({ text: code.slice(start, i), type: "string" });
  return i;
}

function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  const n = code.length;
  let i = 0;

  while (i < n) {
    const ch = code[i];

    if (ch === "/" && code[i + 1] === "/") {
      let end = i;
      while (end < n && code[end] !== "\n") end++;
      tokens.push({ text: code.slice(i, end), type: "comment" });
      i = end;
      continue;
    }

    if (ch === "/" && code[i + 1] === "*") {
      let end = i + 2;
      while (end < n && !(code[end] === "*" && code[end + 1] === "/")) end++;
      tokens.push({
        text: code.slice(i, Math.min(end + 2, n)),
        type: "comment",
      });
      i = Math.min(end + 2, n);
      continue;
    }

    if (ch === '"' || ch === "'") {
      i = consumeString(tokens, code, i);
      continue;
    }

    if (ch === "<") {
      const match = code.slice(i).match(/^<\/?[A-Za-z][\w.]*/);
      if (match) {
        tokens.push({ text: match[0], type: "tag" });
        i += match[0].length;
        continue;
      }
      tokens.push({ text: ch, type: "punct" });
      i += 1;
      continue;
    }

    if (/[A-Za-z_$]/.test(ch)) {
      let end = i;
      while (end < n && /[\w$]/.test(code[end])) end++;
      const word = code.slice(i, end);
      if (code[end] === "(") tokens.push({ text: word, type: "function" });
      else pushKeyword(tokens, word);
      i = end;
      continue;
    }

    if (/[0-9]/.test(ch)) {
      let end = i;
      while (end < n && /[\d.]/.test(code[end])) end++;
      tokens.push({ text: code.slice(i, end), type: "number" });
      i = end;
      continue;
    }

    tokens.push({ text: ch, type: "punct" });
    i += 1;
  }

  return tokens;
}

function writeLineText(lineIndex: number, tokens: Token[], showCursor: boolean) {
  return (
    <span className="code-line__content">
      {tokens.map((token, i) => (
        <span key={`${lineIndex}-${i}`} className={TOKEN_CLASS[token.type]}>
          {token.text}
        </span>
      ))}
      {showCursor && <Cursor />}
    </span>
  );
}

export default function CodeWindow({
  code,
  filename = "file.tsx",
  theme = "light",
  className,
  showCursor = true,
  action,
}: CodeWindowProps) {
  const id = useId();
  const tokens = highlight(code);

  const lines: Token[][] = [];
  let current: Token[] = [];
  for (const token of tokens) {
    if (token.text === "\n") {
      lines.push(current);
      current = [];
    } else {
      current.push(token);
    }
  }
  lines.push(current);

  const classes = ["code-window"];
  if (theme === "dark") classes.push("code-window--dark");
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")}>
      <div className="code-window__bar">
        <div className="code-window__dots" aria-hidden="true">
          <span className="dot dot--red" />
          <span className="dot dot--amber" />
          <span className="dot dot--green" />
        </div>
        <div className="code-window__filename" id={id}>
          {filename}
        </div>
        <span className="code-window__badge">TypeScript</span>
        {action && <div className="code-window__action">{action}</div>}
      </div>
      <div className="code-window__scroll">
        <pre
          className="code-window__code"
          role="region"
          aria-label={`${filename} source code`}
          tabIndex={0}
        >
          {lines.map((lineTokens, i) => (
            <span className="code-line" key={i}>
              <span className="code-line__num" aria-hidden="true">
                {i + 1}
              </span>
              {writeLineText(i, lineTokens, showCursor && i === lines.length - 1)}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}