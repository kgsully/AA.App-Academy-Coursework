import pytest
from RegularPolygon import RegularPolygon

def test_if_get_perimeter_gets_perimter_as_intended():
    # Arrange
    new_polygon = RegularPolygon(4, 5)

    # Act
    expected_perimeter = 20

    # Assert
    assert RegularPolygon.get_perimeter(new_polygon) == expected_perimeter

def test_if_polygon_name_is_correct():
    # Arrange
    new_polygon = RegularPolygon(8, 3)
    new_polygon.identify_polygon()

    # Act
    expected_type = "Octagon"

    # Assert
    assert new_polygon.type == expected_type
    pass
