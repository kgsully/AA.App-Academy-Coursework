def parse(num_str):
    rom_num_conv = {
        "I": 1,
        "IV": 4,
        "V": 5,
        "IX": 9,
        "X": 10,
        "XL": 40,
        "L": 50,
        "XC": 90,
        "C": 100,
        "CD": 400,
        "D": 500,
        "CM": 900,
        "M": 1000,
    }

    dec_num = 0
    i = 0

    while i < len(num_str):
        # check if set of 2 numbers are a valid roman numeral
        if i + 1 < len(num_str) and num_str[i:i+2] in rom_num_conv:
            dec_num += rom_num_conv[num_str[i:i+2]]
            i += 2
        else:  # otherwise, it is a single digit
            dec_num += rom_num_conv[num_str[i]]
            i += 1

    return dec_num
