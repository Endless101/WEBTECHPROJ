from django import  forms

class TestForm(forms.Form):
    name = forms.CharField()
    password = forms.CharField(label='password')
    email = forms.CharField(label='E-Mail')
