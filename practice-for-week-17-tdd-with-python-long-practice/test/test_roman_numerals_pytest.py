from pytest import mark
from app.roman_numerals import parse

# # Original Non-Parameterized version
# def test_roman_numeral_parser():
#     # Arrange
#     value = parse("IX")
#     # Act
#     expected_value = 9
#     # Assert
#     assert value == expected_value

# Parameterized version of test
@mark.parametrize("test_case, expected", [("IX", 9),
                                          ("X", 10),
                                          ("XI", 11),
                                          ("XIV", 14),
                                          ("XIX", 19),
                                          ("XX", 20),
                                          ("XXXIV", 34),
                                          ("XLI", 41),
                                          ("L", 50),
                                          ("XCIX", 99),
                                          ("C", 100),
                                          ("CCCXXXIII", 333),
                                          ("DLV", 555),
                                          ("CDXLIX", 449),
                                          ("MCMLXXII", 1972)])
def test_roman_numeral_parser(test_case, expected):
    # Arrange
    result = parse(test_case)

    assert result == expected
