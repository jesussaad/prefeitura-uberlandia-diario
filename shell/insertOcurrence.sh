#!/bin/bash
example="Uso incorreto. Exemplo de uso: ./insertOcurrence.sh '10/05' 'PET 8 é referente aos dias 10/05 a 14/05 e equivale a 02 aulas de Educação Física'"
[[ $# != 2 ]] && echo "$example" && exit 1

ocurrence_date=$1
ocurrence_text="${2// /%20}"           

wget -qO- http://localhost:3000/robot/start &> /dev/null
wget -qO- http://localhost:3000/robot/login &> /dev/null
wget -qO- http://localhost:3000/robot/clickInOcurrencesMenu &> /dev/null
wget -qO- http://localhost:3000/robot/countClasses &> /dev/null

# max=$(wget -qO- http://localhost:3000/robot/countClasses)
# echo "$max"
# exit

for i in {0..7}
do
    wget -qO- http://localhost:3000/robot/clickInOcurrencesMenu &> /dev/null
    wget -qO- http://localhost:3000/robot/clickClass?classId="$i" &> /dev/null
    wget -qO- http://localhost:3000/robot/clickDate?date="$ocurrence_date" &> /dev/null
    wget -qO- http://localhost:3000/robot/insertOcurrence?text="$ocurrence_text" &> /dev/null
done
