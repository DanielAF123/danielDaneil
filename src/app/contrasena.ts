import * as bcrypt from 'bcryptjs';
import { onErrorResumeNext } from 'rxjs';
export class ContrasenaC {
    static async encriptarContrasena(Contrasena){
        let res;
           let salt = await bcrypt.genSalt(10)
            res =  await bcrypt.hash(Contrasena, salt)
        return res
      }

    static async compararContrasenas(Contrasena,Contrasena2){
        let res;
        res = await bcrypt.compare(Contrasena, Contrasena2);
          return res
    }
}
