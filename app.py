from vigenerlib.vigenerlib.vigener import Kasiski, Friedman, Vigener
import sys

def main():

    cryptogram = """L X C S V O A B F I P L F X G K S V G K Y I F S V M H Y X OV L U E R V X D K C D P C K Y I C U H F Q P Y M E L V M H YR Z A J K E D L F I F C H D F V N S P H O I P P S S M Y D GQ C D P P L P I E R B S R H W H C S H M V H O W M F Y I F LF E F V N S P J L P L P I V C U F S W G V O A K L T N V P EV Q P I P L P Z K N H R G Y H W K S D Z K N H R G Y R Z A ZL J T F M I X A R Q B L V I W G L N G K Y E E L W W G Z W VW G Q C E O D F G J H H""".replace(" ", "").replace("/n", "")
    if len(sys.argv) == 2:
        cryptogram = sys.argv[1]
    print(cryptogram)
    kasiski = Kasiski()
    kasiski.load_cryptogram(cryptogram)
    kasiski.calculate_key_length()
    print("Kasiski test: ", kasiski.key_length)

    language = {}
    with open("data/analyzeCZ.csv") as f:
        for i in f.readlines():
            i = i.replace("\n", "")
            language[i.split(",")[0]] = float(i.split(",")[1])


    friedman = Friedman()
    friedman.load_language(language)
    friedman.load_cryptogram(cryptogram)
    
    print("Friedman test: ", friedman.calculate_key_length())
    key_length = None
    while True:
        key_length = input("Zadejte delku klice: ")

        if key_length.isdigit():
            if int(key_length) > 0:
                break
        

    vigener = Vigener(int(key_length))
    vigener.load_cryptogram(cryptogram)
    vigener.load_language(language)
    vigener.analyze_cryptogram()
    print("Key: ", vigener.key)
    print("Msg: ", vigener.decode(vigener.key))



if __name__ == "__main__":
    main()