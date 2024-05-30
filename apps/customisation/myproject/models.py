from django.db import models



CATEGORY_CHOICES = (
    ('TC', 'Types Of Coffee'),
    ('CS', 'Cup Size'),
    ('T', 'Temperature'),
    ('TB', 'Types Of Beans'),
    ('TM', 'Types Of Milk'),
    ('BO', 'Blending Options'),
    ('TP', 'Toppings')
)

LABEL_CHOICES = (
    ('A', 'Americano'),
    ('C', 'Cappuchino'),
    ('F', 'Frappichino'),
    ('L', 'Latte'),
    ('M', 'Mocha')
)

class CustomisationOption(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    image = models.ImageField(max_length=100)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    label = models.CharField(choices=LABEL_CHOICES, max_length=2)

    def __str__(self):
        return self.name


