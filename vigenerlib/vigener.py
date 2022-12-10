import math
import re

def prime_numbers(max: int)->list[int]:
    base = [int(i) for i in("1"*max)]
    for i in range(2, max):
        if not base[i]:
            continue
        for j in range(int(math.pow(i, i)), max, i):
            base[j] = -1
    return [index for index, i in enumerate(base) if i == 1 and index > 1]

def int_factorization(value: int)->list[int]:
    numbers = prime_numbers(int(math.sqrt(value)))
    factorization = []
    for prim in numbers:
        while value % prim ==0:
            factorization.append(prim)
            value = value // prim
    if value != 1:
        factorization.append(value)
    return factorization
    

class Kasiski:
    @property
    def key_length(self):
        return self._key_length
    @property
    def sub_seq(self):
        return self._sub_sequences

    def __init__(self):
        self._cryptogram: str = ""
        self._key_length:int = 0
    def load_cryptogram(self, cryptogram: str) -> None:
        self._cryptogram = cryptogram
        self._sub_sequences = []
        self.search_sequence()
    def search_sequence(self)-> None:
        result = []
        for i in range(len(self._cryptogram) // 2, 1, -1):
            for j in range(len(self._cryptogram)):
                if j+i <= len(self._cryptogram):
                    
                    #check sub patterns like:  "NHRGY" in "ZKNHRGY"
                    can_continue = False
                    for k in result:
                        if self._cryptogram[j:j+i] in k[0]:
                            can_continue = True
                            break
                    if can_continue:
                        continue
                    
                    local_result = re.findall(self._cryptogram[j:j+i], self._cryptogram)

                    if len(local_result) >= 2:
                        result.append(local_result)

        # for i in range(2, len(self._cryptogram)):
        #     for j in range(len(self._cryptogram)):
        #         local_result = re.findall(self._cryptogram[j:j+i], self._cryptogram) 
        #         if len(local_result) > 1:
        #             result.append(local_result)
        self._sub_sequences = [i[0] for i in result]

    def calculate_key_length(self)->int:
        lengths = [] # délky mezi jednotlivými sub sequencemi
        for i in self._sub_sequences:
            prev_finding = None
            for j in re.finditer(i, self._cryptogram):
                if prev_finding == None:                    
                    prev_finding = j
                    continue
                lengths.append({"text": j.group(), "len": j.span()[0] - prev_finding.span()[0]})
        
        full_factorization = [] # prvočíselný rozklad pro jednotlivé podsekvence
        for i in lengths:
            full_factorization.append({"text": i["text"], "primes": int_factorization(i["len"])})
        
        all_primes_count = {} # počet kolikrát se jednotlivé prvočísla vyskytují v rozkladech (počítá se vždy jeden výskyt na jeden rozklad)
        for i in full_factorization:
            for j in set(i["primes"]):
                if j in all_primes_count.keys():
                    all_primes_count[j] += 1
                else:
                    all_primes_count[j] = 1

        common_prime = max(all_primes_count, key=all_primes_count.get)
        self._key_length = common_prime
        return self._key_length



class Friedman:

    @property
    def key_length(self)->int:
        return self._key_length

    @property
    def cryptogram_analysis(self)->dict[str, float]:
        return self._frequency_analysis

    @property
    def language_analysis(self)->dict[str, float]:
        return self._language_analysis

    def __init__(self):
        self._cryptogram_analysis: dict[str, int] = {}
        self._language_analysis: dict[str, float] = {}
        self._index_language: float = 0
        self._index_cryptogram: float = 0
        self._index_min: float = 0
        self._cryptogram: str = ""
        self._key_length = 0
    def load_language(self, analysis: dict[str, float]) -> None:
        self._language_analysis = analysis

    def load_cryptogram(self, cryptogram: str) -> None:
        self._cryptogram_analysis = {}
        self._cryptogram = cryptogram
        for i in cryptogram:
            if i in self._cryptogram_analysis.keys():
                self._cryptogram_analysis[i] += 1
            else:
                self._cryptogram_analysis[i] = 1

    def calculate_index_language(self) -> None:
        sum: float = 0
        for i in self._language_analysis.items():
            sum += math.pow(i[1], 2)
        self._index_language = sum

    def calculate_index_cryptogram(self) -> None:
        sum: int = 0
        for i in self._cryptogram_analysis.items():
            sum += i[1] * (i[1]-1)
        self._index_cryptogram = sum / (len(self._cryptogram) * (len(self._cryptogram) - 1))
    
    def calculate_index_min(self) -> None:
        sum = 0
        for _ in range(26):
            sum += 1 / math.pow(26, 2)
        self._index_min = sum

    def calculate_key_length(self) -> int:
        self.calculate_index_language()
        self.calculate_index_cryptogram()
        self.calculate_index_min()
        # print("\n({} * {}) / ({} * {} - {} * {} + {})".format(len(self._cryptogram), self._index_language - self._index_min, len(self._cryptogram)-1, self._index_cryptogram, len(self._cryptogram), self._index_min, self._index_language))


        self._key_length = round((len(self._cryptogram)*(self._index_language - self._index_min))/( ((len(self._cryptogram)-1)*self._index_cryptogram) - (len(self._cryptogram) * self._index_min) + self._index_language ))
        return self._key_length
class Vigener:
    def __init__(self, key_length: int):
        self._key_length: int = key_length
        self._cryptogram: str = ""
        self._language_analysis: dict[str, int] = {}
        self._cryptogram_table: list[list[str]] = [[] for _ in range(self._key_length)]
        self._vigener_table: list[list[str]] = []
        for i in range(26):
            self._vigener_table.append([])
            for j in range(26):
                self._vigener_table[i].append(chr(((i + j) % 26) + 65))

    def load_cryptogram(self, cryptogram: str) -> None:
        self._cryptogram = cryptogram

        for index, i in enumerate(cryptogram):
            self._cryptogram_table[index % self._key_length].append(i)
    
    def load_language(self, analysis: dict[str, float]) -> None:
        # self._language_analysis = analysis
        self._language_analysis = {k: v for k, v, in reversed(sorted(analysis.items(), key=lambda item: item[1]))}

    def analyze_cryptogram(self) -> None:
        frequency: list[str] = []
        for col in self._cryptogram_table:
            
            analyze: dict[str, int] = {}
            for i in col:
                if i in analyze.keys():
                    analyze[i] += 1
                else: 
                    analyze[i] = 1
            
            max_value = 0
            max_character = ""

            for i in analyze.items():
                if i[1] > max_value:
                    max_value = i[1]
                    max_character = i[0]
            frequency.append(max_character)
        print(frequency)
        for i in self._language_analysis.items():
            secret_key = self.search_key(frequency, i[1])
            print(self.decode(secret_key))
            #decode a otestování se slovníkem
    def decode(self, secret_key: str)->str:
        #převést zasifrovany text na text text
        pass

    def search_key(self, frequency: list[str], frequent_char: str) -> str:
        secret_key: list[str] = []
        for i in frequency:
            for j in self._vigener_table:
                if j[ord(frequent_char) - ord("A")] == i:
                    secret_key.append(j[0])
                    break
        return "".join(secret_key)
