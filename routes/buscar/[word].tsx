import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";

type Phoenics = {
    audio?: string;
    sourceUrl?: string;
    license?: { name?: string; url?: string };
  };
  
  type Meanings = {
    partOfSpeech?: string;
    definitions?: { definition?: string; synonyms?: string; antonyms?: string;example?:string}[];
    synonyms?: string[];
    anoyms?: string[];
  };
  type Data = {
    phonetics?: Phoenics;
    meanings?: Meanings;
  };
  
  type DicArray = {
    results?: Data[];
  };

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, DicArray>) => {
    const {word} = ctx.params || undefined;
    try {
      const resp = await axios.get<DicArray>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      return ctx.render(resp.data);
    } catch (error) {
      return new Response("Error al obtener los datos", { status: 500 });
    }
  },
};

const Home = (props: PageProps) => {
   return (
      <>
        <div class="general">
          <form method="get" target="/">
            <input class="buscador" type="text" name="word"/>
            <button class="botoncete" type="submit">Enviar</button>
          </form>
  
          <div>
            <h1>Phonetics</h1> {props.data[0].phonetics.map((elem:Phoenics) => {
              return (
                <>
                <div class="container">
                  <p><strong>Audio:</strong> {elem?.audio || ""}</p>
                  <p><strong>SourceUrl:</strong> {elem?.sourceUrl || ""}</p>
                  <p><strong>LicenseName:</strong> {elem?.license?.name || ""}</p>
                  <p><strong>LicenseUrl:</strong> {elem?.license?.url || ""}</p>
                </div>
                </>
              );
            })}
          </div>
  
          <div>
            <h1>Meanings</h1> {props.data[0].meanings.map((elem:Meanings) => {
              return (
                <>
                <div class="container">
                  <p><strong>Speech:</strong> {elem.partOfSpeech || ""}</p>
                  <p><strong>Definitions:</strong> </p>
                  {elem?.definitions.map((elem)=>{
                    return (
                      <>
                      <p>{elem?.definition || ""}</p>
                      <p>{elem?.synonyms[0] || ""}</p>
                      <p>{elem?.antonyms[0] || ""}</p>
                      <p>{elem?.example || ""}</p>
                      </>
                    )
                  })}
                 </div>   
                </>
              );
            })}
          </div>
        </div>
        
      </>
    );
  
};

export default Home;