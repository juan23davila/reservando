// Variable que indica tipo de prueba que vamos a realizar
var expect = chai.expect;

//Pruebas de la funcionalidad Reservar Horario
describe('Test Proyecto Reservando', ()=>{

    let restaurante = new Restaurant(
        50,
        "La cucharita",
        'Corrientazos',
        'Armenia Colombia', 
        ['8:00','10:00','14:00','16:00','18:00','20:00'],
        "../img/desayuno2.jpg",
        [8, 3, 9, 5, 6, 7]
    );
  

    describe('Reservar Horario', ()=>{
        it('Cuando se reserva un horario de un restaurant, este se elimina del arreglo', ()=>{
            let cantidadHorarios = restaurante.horarios.length;
            restaurante.reservarHorario('14:00');
            let found = restaurante.horarios.find(function(element){
                    return element === '14:00';
                }
            )
            expect(found).to.be.equal(undefined);
            expect(restaurante.horarios.length).to.be.equal(cantidadHorarios - 1)
        })
        it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual', ()=>{
            let horariosDisponibles = restaurante.horarios;
            restaurante.reservarHorario('12:00');
            expect(restaurante.horarios).to.eql(horariosDisponibles);
        })
        it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual', ()=>{
            let horariosDisponibles = restaurante.horarios;
            restaurante.reservarHorario();
            expect(restaurante.horarios).to.eql(horariosDisponibles);
        })
    })


    describe('Obtener Puntuacion', ()=>{
        it('Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente', ()=>{
            let sumatoria = 0;
            for(let i = 0; i< restaurante.calificaciones.length; i++){
                sumatoria += restaurante.calificaciones[i];
            }        
            let promerioObtenido = Math.round(sumatoria/restaurante.calificaciones.length * 10)/10;
            let calificacionPrueba = restaurante.obtenerPuntuacion();
            expect(calificacionPrueba).to.be.equal(promerioObtenido);
        })
        it('Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0', ()=>{
            restaurante.calificaciones = [];
            calificacionPrueba = restaurante.obtenerPuntuacion();
            expect(calificacionPrueba).to.be.equal(0);
        })

    })

    describe('Calificar', ()=>{
        it('Al agregar el promedio sea correcto y existan mas calificaciones', ()=>{
            restaurante.calificaciones = [8, 3, 9, 5, 6, 7];
            let cantidadCalificacionesInicial = restaurante.calificaciones.length;
            let sumatoria = 0;
            restaurante.calificar(1);
            for(let i = 0; i< restaurante.calificaciones.length; i++){
                sumatoria += restaurante.calificaciones[i];
            }        
            let promerioObtenido = Math.round(sumatoria/restaurante.calificaciones.length * 10)/10;
            let calificacionPrueba = restaurante.obtenerPuntuacion();
            expect(calificacionPrueba).to.be.equal(promerioObtenido);
            expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial+1);
        })
        it('Al agregar calificacion no numerica la cantidad de califcaiones no aumenta', ()=>{
            let cantidadCalificacionesInicial = restaurante.calificaciones.length;
            restaurante.calificar('1');
            expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
        })
        it('Al agregar calificacion cero (0) la cantidad de califcaiones no aumenta', ()=>{
            let cantidadCalificacionesInicial = restaurante.calificaciones.length;
            restaurante.calificar(0)
            expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
        })
        it('Al agregar calificacion menor a cero (0) la cantidad de califcaiones no aumenta', ()=>{
            let cantidadCalificacionesInicial = restaurante.calificaciones.length;
            restaurante.calificar(-1)
            expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
        })
        it('Al agregar calificacion superior a diez (10) la cantidad de califcaiones no aumenta', ()=>{
            let cantidadCalificacionesInicial = restaurante.calificaciones.length;
            restaurante.calificar(11)
            expect(restaurante.calificaciones.length).to.be.equal(cantidadCalificacionesInicial);
        })
    })

    // Pruebas del objeto Listado
    var listado = new Listado(listadoDeRestaurantes);
    describe('Buscar Restaurante', ()=>{
        it('Se obtiene restaurante por id', ()=>{
            let restaurante = listado.buscarRestaurante(23);
            expect(restaurante.id).to.equal(23);
            expect(restaurante.nombre).to.equal("Chez Moi");
        })
        it('Si el id es enviado como String retorna undefined', ()=>{
            let restaurante = listado.buscarRestaurante('23');
            expect(restaurante.id).to.equal(undefined);
        })

    })
    describe('Obtener Restaurantes', ()=>{
        it('Se hace la consulta sin enviar parametros y no obtiene ningún restaurante', ()=>{
            let restaurantes = listado.obtenerRestaurantes();
            expect(restaurantes).to.be.an('array');
            expect(restaurantes).to.eql([]);
        })
        it('Se hace la consulta con parametros nulos y obtiene todos los restaurantes', ()=>{
            let restaurantes = listado.obtenerRestaurantes(null,null,null);
            expect(restaurantes).to.be.an('array');
            expect(restaurantes).not.eql([]);
            expect(restaurantes.length).to.be.at.least(24);
        })
        it('Filtrando por Rubro', ()=>{
            let restaurantes = listado.obtenerRestaurantes("Pizza", null, null);
            expect(restaurantes).to.be.an('array');
            expect(restaurantes).not.be.eql([]);
            var Pappelli = restaurantes.find(function(element){
                return element.id === 20;
            });
            expect(Pappelli.nombre).to.equal("Pappelli");
            expect(Pappelli.ubicacion).to.equal("París");
        })
        it('Filtrando por Ciudad', ()=>{
            let restaurantes = listado.obtenerRestaurantes(null, 'Londres',null);
            expect(restaurantes).to.be.an('array');
            expect(restaurantes).not.be.eql([]);
            var mandarinRestaurant = restaurantes.find(function(element){
                return element.nombre === "Mandarín Kitchen";
            });
            expect(mandarinRestaurant.id).to.equal(2);
            expect(mandarinRestaurant.rubro).to.equal("Asiática");
        })
        it('Filtrando por Horario', ()=>{
            let restaurantes = listado.obtenerRestaurantes(null,null,"17:30");
            expect(restaurantes).to.be.an('array');
            expect(restaurantes).not.be.eql([]);
            var frogburguerRestaurant = restaurantes.find(function(element){
                return element.id === 11;
            });
            expect(frogburguerRestaurant.nombre).to.equal("Frogburguer");
            expect(frogburguerRestaurant.ubicacion).to.equal("París");
        })
        it('FIltrar por Rubro, Ciudad y Horario', ()=>{
            let restaurantes = listado.obtenerRestaurantes("Ensalada","Nueva York","19:00");
            expect(restaurantes).to.be.an('array');
            expect(restaurantes).not.be.eql([]);
            var tGoodRestaurant = restaurantes.find(function(element){
                return element.id === 14;
            });
            expect(tGoodRestaurant.nombre).to.equal("TGood Seed Salads & Market");
            expect(tGoodRestaurant.ubicacion).to.equal("Nueva York");
        })
    })
    describe("Métodos de Reserva", ()=>{
        it('Se crea una reserva con éxito', ()=>{
            let reserva = new Reserva(
                new Date(2019,6,10,12,30),
                2, 
                15,
                null
            );
            expect(reserva.cantidadPersonas).to.equal(2);
        })
        it('El precio base se calcula correctamente', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 11, 00), 8, 350, "DES1");
            let precioBase = reserva1.calcularPrecioBase();
            expect(precioBase).to.equal(2800);
        })
        it('Se calcula precio total de reserva sin costos adicionales ni descuentos', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 11, 00), 2, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(700);
        })
        it('Se calcula precio total de reserva con costos adicionales de horario pero sin descuentos', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 20, 30), 2, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(735);
        })
        it('Se calcula precio total de reserva con costos adicionales de fin de semana pero sin descuentos', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 26, 19, 30), 2, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(770);
        })
        it('Se calcula precio total de reserva con costos adicionales de horario y de fin de semana pero sin descuentos', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 26, 13, 15), 2, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(805);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por grupoGrande (4-6)', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 4, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(1330);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por grupoGrande (7-8)', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 8, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(2520);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por grupoGrande (>8)', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 20, 350, null);
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(5950);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por cod DES15', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 3, 350, 'DES15');
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(892.5);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por cod DES200', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 3, 350, 'DES200');
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(850);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por cod DES1', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 3, 350, 'DES1');
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(700);
        })
        it('Se calcula precio total de reserva sin costos adicionales pero con descuento por cod DES15 y por personas (7-8)', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 24, 12, 15), 7, 350, 'DES15');
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(1837.5);
        })
        it('Se calcula precio total de reserva con todos los costos adicionales y con los descuentos DES200 y grupoGrande (4-6)', ()=>{
            var reserva1 = new Reserva (new Date(2019, 6, 27, 13, 15), 7, 350, 'DES15');
            let precioTotalReserva = reserva1.calcularPrecioTotalReserva();
            expect(precioTotalReserva).to.equal(2205);
        })
    })
})