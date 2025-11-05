import CodeBlock from "../CodeBlock";

export default function CodeBlockExample() {
  const sampleCode = `# Salom dunyo!
print("Salom, Python!")

# O'zgaruvchi yaratish
ism = "Ali"
yosh = 12

print("Mening ismim", ism)
print("Yoshim", yosh)`;

  return (
    <div className="space-y-6 p-8">
      <CodeBlock code={sampleCode} />
      <CodeBlock code={sampleCode} showLineNumbers />
    </div>
  );
}