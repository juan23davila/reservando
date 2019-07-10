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
function calcularDescPorGrupoGrande(precioBase){
    let descuentoGrupo = 0;

    if(this.cantidadPersonas < 4){
        return descuentoGrupo;
    }
    else if(4 <= this.cantidadPersonas && this.cantidadPersonas <= 6){
        descuentoGrupo = precioBase * 0.05;
    }else if(7 <= this.cantidadPersonas && this.cantidadPersonas <= 8){
        descuentoGrupo = precioBase * 0.1;
    }else{
        descuentoGrupo = precioBase * 0.15;
    }
    return descuentoGrupo;
}

/**
 * Obtiene descuento por codigo
 */
function calcularDescPorCodigo(precioBase){
    let descuentoCod = 0;

    if(this.codDescuento == null){
        return descuentoCod;
    }else if(this.codDescuento == "DES15"){
        descuentoCod = precioBase * 0.15;
    }else if(this.codDescuento == "DES200"){
        descuentoCod = 200;
    }else if(this.codDescuento == "DES1"){
        descuentoCod = this.precioPorPersona;
    }
    return descuentoCod;
}

/**
 * Obtiene el descuento total de la reserva
 */
function calcularDescuentos(precioBase){
    var descGrupo = calcularDescPorGrupoGrande(precioBase);
    var descCod = calcularDescPorCodigo(precioBase);
    return descGrupo + descCod;
}

/**
 * Calcula costo adicional si la reserva es en una hora concurrida
 */
function calcularAddHora(precioBase){
    let soloHora = this.horario.getHours();
    if(soloHora == '13' || soloHora == '20'){
        return precioBase * 0.05;
    }
    return 0;
}

/**
 * Calcula costo adicional si hace la reserva el fin de semana
 */
function calcularAddFinde(precioBase){
    let diaSemana = this.horario.getDay();
    if(diaSemana == 0 || diaSemana == 5 || diaSemana == 6){
        return precioBase * 0.1;
    }
    return 0;
}

/**
 * Obtiene el total de los costos adicionales de la reserva
 */
function calcularAdicionales(precioBase){
    var addPorHorario = calcularAddHora(precioBase);
    var addPorFinde = calcularAddFinde(precioBase);
    return addPorHorario + addPorFinde;
}

/**
 * Calcula el precio total de una reserva
 */
Reserva.prototype.calcularPrecioTotalReserva = function(adicionales){
    let precioBase = calcularPrecioBase();
    let descuentos = calcularDescuentos(precioBase);
    let adicionales = calcularAdicionales(precioBase);
    return (precioBase + adicionales - descuentos);
}

