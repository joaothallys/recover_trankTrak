async function getCardIds() {
    const url = "https://api.crm.poli.digital/api/cards?isRecurrentValue=false&funnelStepId=1742";
    const options = {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBvbGljaGF0IiwiaWF0IjoxNjg3NDY3NjM2LCJleHAiOjE2ODc0Njc2MzZ9.2ArMmkujHX9PR_tCUWfZzbpPkNgqYBwxVb0QjDUmFZA`
      }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.map(card => ({ cardId: card.id, responsibleId: card.responsibleId }));
  }
  
  // Função para postar uma nova tarefa em um card específico
  async function postNewTask(cardId, data) {
    const url = "https://api.crm.poli.digital/api/tasks";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBvbGljaGF0IiwiaWF0IjoxNjg3NDY3NjM2LCJleHAiOjE2ODc0Njc2MzZ9.2ArMmkujHX9PR_tCUWfZzbpPkNgqYBwxVb0QjDUmFZA`
      },
      body: JSON.stringify(data)
    };
  
    const response = await fetch(url, options);
    return await response.json();
  }
  
  
  const currentDate = new Date(); // Obtém a data e hora atual
  currentDate.setHours(10, 20, 0, 0); // Define a hora para 16:00
  
  // Formata a data para o formato desejado (exemplo: "2024-02-05T16:00:00.000Z")
  const formattedDate = currentDate.toISOString().slice(0, 11) + "10:20:00.000Z";
  
  const inputData = {
    "responsibleId": "responsibleId_value", // Substitua pelo valor correto
    "date": formattedDate // Use a data atual com a hora definida para 16:00
  };
  
  // Obtém os IDs dos cards
  const cardIds = await getCardIds();
  const cardIdsWithResponsibleIds = await getCardIds();
  
  const results = [];
  
  // Loop sobre os cardIds para criar e postar tarefas
  for (const { cardId, responsibleId } of cardIdsWithResponsibleIds) {
    const newTaskData = {
      "title": "[SDR 2.0] Dia 4 e-mail",
      "date": formattedDate, // Use a data com hora definida para 16:00
      "subType": 3,
      "responsibleId": responsibleId,
      "contactId": null,
      "companyId": null,
      "cardId": cardId,
      "status": 2,
      "customFields": [],
      "type": 1
    }
  
    const result = await postNewTask(cardId, newTaskData);
    results.push(result);
  }
  
  // Realiza o POST da nova tarefa
  const newTaskResult = await postNewTask(cardIds[0], results[0]); // Por exemplo, você pode usar o primeiro cardId e o primeiro resultado
  
  
  
  // Define a saída para incluir os dados da resposta da solicitação POST
  output = { data: newTaskResult };