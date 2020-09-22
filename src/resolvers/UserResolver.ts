import { User } from '../../src/entity/User';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { hash } from 'bcryptjs'

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users(){
        return User.find();
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email:string,
        @Arg('password') password:string,
    ){
        try{
            const hashedPassword = await hash(password,12);
            await User.insert({email: email, password: hashedPassword});
   
            return true;
        }catch(e){
            return false;
        }

    }
}