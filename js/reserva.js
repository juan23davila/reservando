var Reserva = function(horario,cantidadPersonas, precioPorPersona,codDescuento){
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPorPersona = precioPorPersona;
    this.codDescuento = codDescuento;
}

Reserva.prototype.calcularPrecioBase = function(){
    return this.precioPorPersona * this.cantidadPersonas;
}

/**
 * Obtiene descuento por grupo grande
 */
function calcularDescPorGrupoGrande(precioBase, cantidadPersonas){
    let descuentoGrupo = 0;
    if(cantidadPersonas >= 4){
        if(4 <= cantidadPersonas && cantidadPersonas <= 6){
            descuentoGrupo = precioBase * 0.05;
        }else if(7 <= cantidadPersonas && cantidadPersonas <= 8){
            descuentoGrupo = precioBase * 0.1;
        }else{
            descuentoGrupo = precioBase * 0.15;
        }
    }    
    return descuentoGrupo;
}

/**
 * Obtiene descuento por codigo
 */
function calcularDescPorCodigo(precioBase, codDescuento, precioPorPersona){
    let descuentoCod = 0;

    if(codDescuento == null){
        return descuentoCod;
    }else if(codDescuento == "DES15"){
        descuentoCod = precioBase * 0.15;
    }else if(codDescuento == "DES200"){
        descuentoCod = 200;
    }else if(codDescuento == "DES1"){
        descuentoCod = precioPorPersona;
    }
    return descuentoCod;
}

/**
 * Obtiene el descuento total de la reserva
 */
function calcularDescuentos(precioBase, cantidadPersonas, codDescuento, precioPorPersona){
    var descGrupo = calcularDescPorGrupoGrande(precioBase, cantidadPersonas);
    var descCod = calcularDescPorCodigo(precioBase, codDescuento, precioPorPersona);
    return descGrupo + descCod;
}

/**
 * Calcula costo adicional si la reserva es en una hora concurrida
 */
function calcularAddHora(precioBase,horario){
    let soloHora = horario.getHours();
    if(soloHora == '13' || soloHora == '20'){
        return precioBase * 0.05;
    }
    return 0;
}

/**
 * Calcula costo adicional si hace la reserva el fin de semana
 */
function calcularAddFinde(precioBase,horario){
    let diaSemana = horario.getDay();
    if(diaSemana == 0 || diaSemana == 5 || diaSemana == 6){
        return precioBase * 0.1;
    }
    return 0;
}

/**
 * Obtiene el total de los costos adicionales de la reserva
 */
function calcularAdicionales(precioBase, horario){
    var addPorHorario = calcularAddHora(precioBase,horario);
    var addPorFinde = calcularAddFinde(precioBase,horario);
    return addPorHorario + addPorFinde;
}

/**
 * Calcula el precio total de una reserva
 */
Reserva.prototype.calcularPrecioTotalReserva = function(){
    let precioBase = this.calcularPrecioBase();
    let descuentos = calcularDescuentos(precioBase, this.cantidadPersonas, this.codDescuento, this.precioPorPersona);
    let adicionales = calcularAdicionales(precioBase, this.horario);
    return (precioBase + adicionales - descuentos);
}

