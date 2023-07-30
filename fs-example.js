// import fs from 'fs'

// Sincronica

// Escribir txt
// fs.writeFileSync('./ejemplo.txt', 'Hola buenas noches')

// Consultar si existe txt
// console.log(fs.existsSync('./ejemplo.txt'))

// if (fs.existsSync('./ejemplo.txt')) {
//     let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
//     console.log(contenido)
//     fs.appendFileSync('./ejemplo.txt', '\nHola, buenas tardes')

//     // eliminar txt
//     fs.unlinkSync('./ejemplo.txt')
// }

// callbacks
// fs.writeFile('./ejemplo.txt', 'Hola mundo', (error) => {
//     if (error) 'Error en escritura de archivo'
//     fs.readFile('./ejemplo.txt', 'utf-8', (error, resultado) => {
//         if (error) 'Error al leer archivo'
//         console.log(resultado)
//         fs.appendFile('./ejemplo.txt', '\nHola, buenas tardes', (error) => {
//             if (error) 'Error al modificar archivo' 
//             // fs.unlink('./ejemplo.txt', (error) => {
//             //     if (error) 'Error al modificar archivo'
//             //     fs.unlink('./ejemplo.txt')
//             // })
//         })
//     })
// })

import {promises as fs} from 'fs'

const consultarTXT = async () => {
    await fs.writeFile('./ejemplo.txt', 'Hola buenas noches')
    let resultado = await fs.readFile('./ejemplo.txt', 'utf-8')
    console.log(resultado)
    await fs.appendFile('./ejemplo.txt', '\nAdios, mundo')
    await fs.unlink('./ejemplo.txt')
}

consultarTXT()
