export enum TodoStatus {
  PENDENTE,
  EM_ANDAMENTO,
  CONCLUIDO,
}

export const TodoStatusLabel = new Map<number, string>([
  [TodoStatus.PENDENTE, 'Pendente'],
  [TodoStatus.EM_ANDAMENTO, 'Em andamento'],
  [TodoStatus.CONCLUIDO, 'Concluído'],
]);

  // mapa trabalha com chave/valor
  // sempre procura a chave e retorna o valor
  // usando o método get() passamos a chave e caso ele encontre retorna o valor
