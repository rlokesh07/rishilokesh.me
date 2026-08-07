import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = { content: string }

export function NotebookMarkdown({ content }: Props) {
  return (
    <div style={{ fontSize: "14px", lineHeight: 1.8, color: "#d8d4d0" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 style={{
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#ff2200",
              marginTop: "48px",
              marginBottom: "16px",
              paddingBottom: "6px",
              borderBottom: "1px solid #1a0000",
            }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#cc1a00",
              marginTop: "32px",
              marginBottom: "12px",
            }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p style={{ marginBottom: "20px", lineHeight: 1.8 }}>{children}</p>
          ),
          ul: ({ children }) => (
            <ul style={{
              marginBottom: "20px",
              paddingLeft: "0",
              listStyle: "none",
            }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{
              marginBottom: "20px",
              paddingLeft: "20px",
              listStyleType: "decimal",
            }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{
              marginBottom: "6px",
              paddingLeft: "16px",
              position: "relative",
            }}>
              <span style={{
                position: "absolute",
                left: 0,
                color: "#ff2200",
              }}>—</span>
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              style={{ color: "#ff2200", textDecoration: "underline", textUnderlineOffset: "3px" }}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong style={{ color: "#f0ece8", fontWeight: 700 }}>{children}</strong>
          ),
          code: ({ children }) => (
            <code style={{
              background: "#140000",
              border: "1px solid #2a0000",
              padding: "1px 5px",
              fontSize: "0.85em",
              color: "#ff6644",
              fontFamily: "inherit",
            }}>
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: "3px solid #ff2200",
              paddingLeft: "16px",
              marginBottom: "20px",
              color: "#888880",
              fontStyle: "normal",
            }}>
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr style={{
              margin: "40px 0",
              border: "none",
              borderTop: "1px solid #1a0000",
            }} />
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: "100%",
                margin: "32px 0",
                border: "1px solid #1a0000",
                display: "block",
              }}
            />
          ),
          table: ({ children }) => (
            <div style={{ overflowX: "auto", marginBottom: "24px" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ borderBottom: "2px solid #ff2200" }}>{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr style={{ borderBottom: "1px solid #1a0000" }}>{children}</tr>
          ),
          th: ({ children }) => (
            <th style={{
              padding: "8px 12px",
              textAlign: "left",
              textTransform: "uppercase",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "#ff2200",
              fontWeight: 700,
            }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: "8px 12px", color: "#d8d4d0" }}>{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
