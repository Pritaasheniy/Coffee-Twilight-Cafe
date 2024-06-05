from django.db import migrations, models

def create_coffeeoption(apps, schema_editor):
    CoffeeOption = apps.get_model('myproject', 'CoffeeOption')
    if not CoffeeOption.objects.exists():
        CoffeeOption.objects.create(name='Espresso', price=2.50)


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CoffeeOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.FloatField()),
                ('image', models.ImageField(max_length=100)),
            ],
        ),
        migrations.RunPython(create_coffeeoption),
    ]

