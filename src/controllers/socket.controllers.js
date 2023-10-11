export const initilizeSocketGame = (io)=>{
    io.on('connection', (socket) => {
        // Manejo de eventos de juego de Chinchón, como 'unirse-a-mesa', 'realizar-jugada', etc.
        socket.on('unirse-a-mesa', (data) => {
          // Lógica para unirse a una mesa
    
          // Emite eventos de actualización a los jugadores en la mesa, por ejemplo:
          io.to(data.mesaId).emit('jugador-unido', data);
        });
    
        // Otros eventos de juego
    
        socket.on('disconnect', () => {
          // Lógica para manejar desconexiones de jugadores
        });
      });

}
 