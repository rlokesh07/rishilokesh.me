import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = { content: string }

export function NotebookMarkdown({ content }: Props) {
  return (
    <div style={{ fontSize: "15px", lineHeight: 1.7, color: "#111" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", marginTop: "36px", marginBottom: "10px" }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "24px", marginBottom: "8px" }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p style={{ marginBottom: "16px" }}>{children}</p>
          ),
          ul: ({ children }) => (
            <ul style={{ marginBottom: "16px", paddingLeft: "20px" }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ marginBottom: "16px", paddingLeft: "20px" }}>{children}</ol>
          ),
          li: ({ children }) => (
            <li style={{ marginBottom: "4px" }}>{children}</li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong style={{ fontWeight: "bold" }}>{children}</strong>
          ),
          code: ({ children }) => (
            <code style={{
              background: "#f4f4f4",
              padding: "1px 5px",
              fontSize: "0.9em",
              fontFamily: "monospace",
            }}>
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: "3px solid #ddd",
              paddingLeft: "16px",
              color: "#666",
              marginBottom: "16px",
            }}>
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr style={{ margin: "32px 0", borderColor: "#eee" }} />
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", marginBottom: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ borderBottom: "2px solid #ddd" }}>{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr style={{ borderBottom: "1px solid #eee" }}>{children}</tr>
          ),
          th: ({ children }) => (
            <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: "bold" }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: "8px 12px" }}>{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
