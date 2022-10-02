export interface IBlogPost {
  id?: string;
  titulo: string;
  conteudo: string;
  comentarios: IComentario[];
}

export interface IComentario {
  _id?: string;
  nome: string;
  conteudo: string;
}
