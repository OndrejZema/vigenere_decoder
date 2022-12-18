import sys
import re


def main():
    if len(sys.argv) != 2:
        print("Expected 2 arguments")
        return
    text = sys.argv[1].upper().replace("ě", "e").replace("š", "s").replace("č", "c").replace("ř", "r").replace("ž", "z").replace("ý", "y").replace("á", "a").replace("í", "i").replace("é", "e").replace("ó", "o")
    print(text)
    print()
    print("".join(re.findall("[A-Z]+", text)))



if __name__ == "__main__":
    main()