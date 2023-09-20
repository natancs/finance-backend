const item = {
  name: 'name',
  id: 'asdasd'
}

const arrayItem = [
  {
    name: 'name',
    id: 'asdasd'
  },
  {
    name: 'name',
    id: 'asdasdeeaasd'
  },
  {
    name: 'name',
    id: 'asdasddasdaseaasd'
  }
]


// console.log(arrayItem.find(item => {
//   console.log(Object.values(item).find(value => value === "name"))
//   Object.values(item).find(value => value === "name")
// }))

console.log(arrayItem.find(item => {
  const values = Object.values(item)
  const keys = Object.keys(item)
  console.log(values.find(value => {
    value === "asdasd"
  }))
}))


function encontrarChavePorValor(objeto, valorProcurado) {
  for (let chave in objeto) {
    if (objeto[chave] === valorProcurado) {
      return chave; // Retorna a primeira chave que corresponde ao valor
    }
  }
  return null; // Retorna null se o valor não for encontrado no objeto
}

const meuObjeto = {
  chave1: "valor1",
  chave2: "valor2",
  chave3: "valor3"
};

const valorProcurado = "valor2";
const chaveEncontrada = encontrarChavePorValor(meuObjeto, valorProcurado);

if (chaveEncontrada !== null) {
  console.log(`A chave para o valor "${valorProcurado}" é "${chaveEncontrada}".`);
} else {
  console.log(`O valor "${valorProcurado}" não foi encontrado no objeto.`);
}
