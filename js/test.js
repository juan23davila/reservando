// Variable que indica tipo de prueba que vamos a realizar
var expect = chai.expect;

//Pruebas de la funcionalidad Reservar Horario

describe('Funcionalidad Reservar Horario', ()=>{

    it('Dado un restaurante con el horario 14:00, al reservar ese horario, se elimina ese horario de su lista de horarios', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 3, 9, 5, 6, 7]
        );

        let cantidadHorarios = restaurante.horarios.length;
        restaurante.reservarHorario('14:00');
        let found = restaurante.horarios.find(function(element){
                return element === '14:00';
            }
        )
        expect(found).to.be.equal(undefined);
        expect(restaurante.horarios.length).to.be.equal(cantidadHorarios - 1)
    })
    it('Dado un restaurante sin el horario 12:00, al reservar ese horario, no se elimina ningún horario de su lista de horarios', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 3, 9, 5, 6, 7]
        );

        let horariosDisponibles = restaurante.horarios;
        restaurante.reservarHorario('12:00');
        expect(restaurante.horarios).to.eql(horariosDisponibles);
    })
    it('Dado un restaurante con diferentes horarios, al reservar un horario pero sin indicar la hora de la reserva, los horarios disponibles deben seguir siendo los mismos ', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 3, 9, 5, 6, 7]
        );

        let horariosDisponibles = restaurante.horarios;
        restaurante.reservarHorario();
        expect(restaurante.horarios).to.eql(horariosDisponibles);
    })
})


describe('Obtener Puntuacion de un Restaurante', ()=>{
    it('Dado un restaurant con las calificaciones [8, 4, 9, 5, 6, 7], la puntuación (que es el promedio de ellas) debe ser 6.5', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 4, 9, 5, 6, 7]
        );
        let calificacionPrueba = restaurante.obtenerPuntuacion();
        expect(calificacionPrueba).to.be.equal(6.5);
    })
    it('Dado un restaurante sin calificaciones, su puntuación promedio es 0', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            []
        );
        calificacionPrueba = restaurante.obtenerPuntuacion();
        expect(calificacionPrueba).to.be.equal(0);
    })

})

describe('Calificar Restaurante', ()=>{
    it('Dado un restaurant con 3 calificaciones, al agregrar una calificación válida, esta se agrega correctamente', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 4, 9]
        );

        let cantidadCalificacionesInicial = restaurante.calificaciones.length;
        restaurante.calificar(1);
        let calificacionPrueba = restaurante.obtenerPuntuacion();
        expect(calificacionPrueba).to.be.equal(5.5);
        expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial+1);
    })
    it('Dado un restaurante con 6 calificaciones, al agregar una calificacion invalida (no numérica), la cantidad de calificaciones registradas no se ve alterada', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 4, 9, 5, 6, 7]
        );

        let cantidadCalificacionesInicial = restaurante.calificaciones.length;
        restaurante.calificar('1');
        expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
    })
    it('Dado un restaurante con 6 calificaciones, al agregar una calificacion invalida (0), la cantidad de calificaiones no aumenta', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 3, 9, 5, 6, 7]
        );

        let cantidadCalificacionesInicial = restaurante.calificaciones.length;
        restaurante.calificar(0)
        expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
    })
    it('Dado un restaurante con 6 calificaciones, al agregar una calificacion invalida (menor a cero), la cantidad de calificaiones no aumenta', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 3, 9, 5, 6, 7]
        );

        let cantidadCalificacionesInicial = restaurante.calificaciones.length;
        restaurante.calificar(-1)
        expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
    })
    it('Dado un restaurante con 6 calificaciones, al agregar una calificacion invalida (superior a diez), la cantidad de calificaiones no aumenta', ()=>{
        let restaurante = new Restaurant(
            50,
            "La cucharita",
            'Corrientazos',
            'Armenia Colombia', 
            ['8:00','10:00','14:00','16:00','18:00','20:00'],
            "../img/desayuno2.jpg",
            [8, 3, 9, 5, 6, 7]
        );

        let cantidadCalificacionesInicial = restaurante.calificaciones.length;
        restaurante.calificar(11)
        expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
    })
})

// Pruebas del objeto Listado
describe('Buscar Restaurante', ()=>{
    var arrayRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
        new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
        new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
        new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
        new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
        new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
        new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
        new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
        new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7, ]),
        new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
        new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
        new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
        new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
        new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
        new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
        new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
        new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
        new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
        new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
        new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
    ];

    var listadoTest = new Listado(arrayRestaurantes);
    it('Dado un listado de restaurantes, al buscar el restaurante con id 23, se obtiene el restaurante correcto', ()=>{
        let restaurante = listadoTest.buscarRestaurante(23);
        expect(restaurante.id).to.equal(23);
        expect(restaurante.nombre).to.equal("Chez Moi");
    })
    it('Dado un listado de restaurantes, al buscar el restaurante por id enviando una cadena de texto, se obtiene undefined', ()=>{
        let restaurante = listadoTest.buscarRestaurante('23');
        expect(restaurante.id).to.equal(undefined);
    })

})
describe('Obtener Restaurantes', ()=>{
    var arrayRestaurantes = [
        new Restaurant(1, "TAO Uptown", "Asiática", "Nueva York", ["13:00", "15:30", "18:00"], "../img/asiatica1.jpg", [6, 7, 9, 10, 5]),
        new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]),
        new Restaurant(3, "Burgermeister", "Hamburguesa", "Berlín", ["11:30", "12:00", "22:30"], "../img/hamburguesa4.jpg", [5, 8, 4, 9, 9]),
        new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]),
        new Restaurant(5, "Jolly", "Asiática", "Berlín", ["12:00", "13:30", "16:00"], "../img/asiatica3.jpg", [8, 3, 9, 5, 6, 7]),
        new Restaurant(6, "Green salad", "Ensalada", "Berlín", ["17:00", "19:00", "20:30"], "../img/ensalada2.jpg", [8, 3, 2, 1, 8, 7]),
        new Restaurant(7, "Osteria Da Fortunata", "Pasta", "Roma", ["13:00", "15:30", "18:00"], "../img/pasta2.jpg", [7, 7, 7, 7, 3, 9]),
        new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]),
        new Restaurant(9, "La Trottinette", "Pasta", "París", ["16:00", "18:00", "21:30"], "../img/pasta5.jpg", [8, 8, 7, 7, 7, 7]),
        new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]),
        new Restaurant(11, "Frogburguer", "Hamburguesa", "París", ["12:00", "15:00", "17:30"], "../img/hamburguesa1.jpg", [9, 8, 5, 2, 9]),
        new Restaurant(12, "Just Salad", "Ensalada", "Nueva York", ["12:00", "15:00", "17:30"], "../img/ensalada3.jpg", [8, 1, 4, 5, 5, 7]),
        new Restaurant(13, "The Counter", "Hamburguesa", "Nueva York", ["17:00", "18:00", "19:30"], "../img/hamburguesa2.jpg", [6, 9, 7, 6, 7, ]),
        new Restaurant(14, "TGood Seed Salads & Market", "Ensalada", "Nueva York", ["17:00", "19:00", "22:30"], "../img/ensalada4.jpg", [8, 8, 8, 8, 5, 7]),
        new Restaurant(15, "Carmine's", "Pasta", "Nueva York", ["14:30", "16:30", "19:00"], "../img/pasta1.jpg", [9, 8, 5, 5, 9]),
        new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]),
        new Restaurant(17, "Vapiano", "Pasta", "Berlín", ["12:00", "15:00", "17:30"], "../img/pasta4.jpg", [8, 4, 6, 7, 4, 7]),
        new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8, 8, 8, 4, 6, 7]),
        new Restaurant(19, "Les Deux Magots", "Desayuno", "París", ["17:00", "19:00", "22:30"], "../img/desayuno4.jpg", [8, 4, 6, 6, 7]),
        new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]),
        new Restaurant(21, "Trattoria La Cenetta", "Pizza", "Berlín", ["12:00", "15:00", "17:30"], "../img/pizza4.jpg", [8, 4, 6, 2, 5, 7]),
        new Restaurant(22, "Byron Hoxton", "Hamburguesa", "Londres", ["14:00", "16:00", "21:30"], "../img/hamburguesa3.jpg", [4, 9, 10, 10, 6]),
        new Restaurant(23, "Chez Moi", "Ensalada", "París", ["11:00", "12:00", "14:30"], "../img/ensalada1.jpg", [8, 4, 5, 5, 5, 5]),
        new Restaurant(24, "Maison Kayser", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7]),
    ];

    var listadoTest = new Listado(arrayRestaurantes);

    it('Dado un listado de restaurantes, la hacer una consulta sin enviar parametros, no obtiene ningún restaurante', ()=>{
        let restaurantes = listadoTest.obtenerRestaurantes();
        expect(restaurantes).to.be.an('array');
        expect(restaurantes).to.eql([]);
    })
    it('Dado un listado de restaurantes, Se hace la consulta con parametros nulos y obtiene toda la lista de restaurantes', ()=>{
        let restaurantes = listadoTest.obtenerRestaurantes(null,null,null);
        expect(restaurantes).to.be.an('array');
        expect(restaurantes).not.eql([]);
        expect(restaurantes.length).to.be.at.least(24);
    })
    it('Dado un listado de restaurantes, se hace la consulta filtrando por el rubro Pizza y se valida que uno de los restaurantes obtenidos tenga nombre Pappelli ubicado en París', ()=>{
        let restaurantes = listadoTest.obtenerRestaurantes("Pizza", null, null);
        expect(restaurantes).to.be.an('array');
        expect(restaurantes).not.be.eql([]);
        var Pappelli = restaurantes.find(function(element){
            return element.id === 20;
        });
        expect(Pappelli.nombre).to.equal("Pappelli");
        expect(Pappelli.ubicacion).to.equal("París");
    })
    it('Dado un listado de restaurantes, se hace la consulta filtrando por la ciudad Londres y se valida que uno de los restaurantes obtenidos tenga id 2 y que su rubro sea Asitica', ()=>{
        let restaurantes = listadoTest.obtenerRestaurantes(null, 'Londres',null);
        expect(restaurantes).to.be.an('array');
        expect(restaurantes).not.be.eql([]);
        var mandarinRestaurant = restaurantes.find(function(element){
            return element.nombre === "Mandarín Kitchen";
        });
        expect(mandarinRestaurant.id).to.equal(2);
        expect(mandarinRestaurant.rubro).to.equal("Asiática");
    })
    it('Dado un listado de restaurantes, se hace la consulta filtrando por horario 17:30 y se valida que uno de los restaurantes obtenidos tenga nombre Frogburguer y su ubicacion es Paris', ()=>{
        let restaurantes = listadoTest.obtenerRestaurantes(null,null,"17:30");
        expect(restaurantes).to.be.an('array');
        expect(restaurantes).not.be.eql([]);
        var frogburguerRestaurant = restaurantes.find(function(element){
            return element.id === 11;
        });
        expect(frogburguerRestaurant.nombre).to.equal("Frogburguer");
        expect(frogburguerRestaurant.ubicacion).to.equal("París");
    })
    it('Dado un listado de restaurantes, se hace la consulta filtrando por Rubro Ensalada, Ciudad Nueva York y Horario 19:00 y se valida que uno de los restaurantes obtenidos tenga nombre TGood Seed Salads & Market', ()=>{
        let restaurantes = listadoTest.obtenerRestaurantes("Ensalada","Nueva York","19:00");
        expect(restaurantes).to.be.an('array');
        expect(restaurantes).not.be.eql([]);
        var tGoodRestaurant = restaurantes.find(function(element){
            return element.id === 14;
        });
        expect(tGoodRestaurant.nombre).to.equal("TGood Seed Salads & Market");
        expect(tGoodRestaurant.ubicacion).to.equal("Nueva York");
    })
})
describe("Pruebas implementando Objeto Reserva", ()=>{
    it('Se crea una reserva con éxito', ()=>{
        let reserva = new Reserva(
            new Date(2019,6,10,12,30),
            2, 
            15,
            null
        );
        expect(reserva.cantidadPersonas).to.equal(2);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019, para 8 personas y el costo por persona de 350, el precio base (2800) se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 11, 00), 8, 350, "DES1");
        let precioBase = reserva1.calcularPrecioBase();
        expect(precioBase).to.equal(2800);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019, para 2 personas y el costo por persona de 350, el precio total de reserva (700) sin costos adicionales ni descuentos se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 11, 00), 2, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(700);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 20:30, para 2 personas y el costo por persona de 350, el precio total de reserva con costos adicionales de horario pero sin descuentos se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 20, 30), 2, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(735);
    })
    it('Dada una reserva para la fecha 26 de Julio del 2019 a las 19:30, para 2 personas y el costo por persona de 350, el precio total de reserva con costos adicionales de fin de semana pero sin descuentos se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 26, 19, 30), 2, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(770);
    })
    it('Dada una reserva para la fecha 26 de Julio del 2019 a las 13:15, para 2 personas y el costo por persona de 350, el precio total de reserva con costos adicionales de horario y de fin de semana pero sin descuentos se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 26, 13, 15), 2, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(805);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 4 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por grupoGrande (4-6) se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 4, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(1330);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 8 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por grupoGrande (7-8) se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 8, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(2520);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 20 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por grupoGrande (>8) se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 20, 350, null);
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(5950);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 3 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por cod DES15 se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 3, 350, 'DES15');
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(892.5);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 3 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por cod DES200 se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 3, 350, 'DES200');
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(850);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 3 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por cod DES1 se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 3, 350, 'DES1');
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(700);
    })
    it('Dada una reserva para la fecha 24 de Julio del 2019 a las 12:15, para 7 personas y el costo por persona de 350, el precio total de reserva sin costos adicionales pero con descuento por cod DES15 y por personas (7-8) se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 7, 350, 'DES15');
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(1837.5);
    })
    it('Dada una reserva para la fecha 27 de Julio del 2019 a las 13:15, para 7 personas y el costo por persona de 350, el precio total de reserva con todos los costos adicionales y con los descuentos DES200 y grupoGrande (4-6) se calcula correctamente', ()=>{
        var reserva1 = new Reserva (new Date(2019, 6, 27, 13, 15), 7, 350, 'DES15');
        let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
        expect(precioTotalReserva).to.equal(2205);
    })
})