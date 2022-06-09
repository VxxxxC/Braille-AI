import { seed as inputImage } from './seeds/input-image'
import { seed as deleteImage } from './seeds/delete-image'


describe('database test', () => {

   test('image input', () => {


      let resA = deleteImage
      console.log(resA)


      let resB = inputImage
      console.log(resB)
   })
})