import sys


REPL = str.maketrans(
    {
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
    }
)


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python scripts/normalize_quotes.py <path>")
        return 2
    path = sys.argv[1]
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    s2 = s.translate(REPL)
    if s2 == s:
        print(f"No changes: {path}")
        return 0
    with open(path, "w", encoding="utf-8") as f:
        f.write(s2)
    print(f"Normalized quotes: {path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

