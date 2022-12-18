import sys


def main():
    if len(sys.argv) != 2:
        print("Expected 2 arguments")
        return

    freq = {}
    for i in sys.argv[1]:
        if i in freq.keys():
            freq[i] += 1
        else:
            freq[i] = 1
    print(freq)



if __name__ == "__main__":
    main()