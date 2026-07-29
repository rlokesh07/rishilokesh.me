import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type MarkdownProps = {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="font-heading mt-10 mb-3 text-xl uppercase tracking-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-heading mt-8 mb-2 text-lg uppercase tracking-tight">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-5 text-[1.05rem] leading-7 text-foreground">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mb-5 list-disc space-y-2 pl-5 leading-7">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-5 list-decimal space-y-2 pl-5 leading-7">
            {children}
          </ol>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="underline decoration-2 underline-offset-2 hover:bg-foreground hover:text-background"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="border border-foreground bg-muted px-1 py-0.5 font-mono text-[0.85em]">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-5 border-l-4 border-foreground pl-4 text-muted-foreground">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-8 border-0 border-t-2 border-foreground" />,
        table: ({ children }) => (
          <div className="mb-5 overflow-x-auto">
            <table className="w-full border-collapse border-2 border-foreground font-mono text-sm">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-foreground text-background">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b-2 border-foreground">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="border-r-2 border-background px-4 py-2 text-left font-medium uppercase tracking-wide last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-r-2 border-foreground px-4 py-2 last:border-r-0">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
