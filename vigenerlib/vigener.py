import math


class Kasiski:

    def __init__(self):
        pass
    def load_cryptogram():
        pass
    def search_sequence():
        pass
    def get_result(self):
        pass

class Friedman:

    @property
    def cryptogram_analysis(self)->dict[str, int]:
        return self._frequency_analysis

    @property
    def language_analysis(self):
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

    def calculate_key_length(self) -> None:
        self._key_length = (len(self._cryptogram)*(self._index_language - self._index_min))/( ((len(self._cryptogram)-1)*self._index_cryptogram) - (len(self._cryptogram) * self._index_min) + self._index_language )

class Vigener:
    def __init__(self, key_length: int):
        self._key_length: int = key_length
        self._cryptogram: str = ""
        self._language_analysis: dict[str, int] = {}
        self._cryptogram_table: list[list[str]] = []
        for i in range(self._key_length):
            self._cryptogram_table.append([])

    def load_cryptogram(self, cryptogram: str) -> None:
        self._cryptogram = cryptogram
        for index, i in enumerate(cryptogram):
            self._cryptogram_table[index % self._key_length + 1].append(i)
    
    def load_language(self, analysis: dict[str, float]) -> None:
        self._language_analysis = analysis

    def analyze_cryptogram(self):
        secret: list[str] = []
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
            
            #najit v vigenerove tabulce v jake radce je "e" pro toto max_character 
        

    
    def decode(self):
        pass