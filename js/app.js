window.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {

	//console.log("Iniciando...");
    carregarConfiguracio();

    //crearGrups();
	crearTorneig()
    //crearSemifinals();

}

function carregarConfiguracio() {
    document.getElementById("titolTorneig").textContent =
        `${CONFIG.titol} ${CONFIG.any}`;

    document.getElementById("logoTorneig").src =
        CONFIG.logos.torneig;

    document.getElementById("logoClub").src =
        CONFIG.logos.club;
		
    document.getElementById("favicon").href =
        CONFIG.logos.torneig;
}

function crearTorneig(){

    const contenedor = document.getElementById("contenedor");

    contenedor.appendChild(crearGrup(CONFIG.grups[0])); // Dilluns
    contenedor.appendChild(crearGrup(CONFIG.grups[1])); // Dimarts

    contenedor.appendChild(crearSemifinals());

    contenedor.appendChild(crearGrup(CONFIG.grups[2])); // Dimecres
    contenedor.appendChild(crearGrup(CONFIG.grups[3])); // Dijous

    contenedor.appendChild(crearFinal());

}

function crearSemifinals() {

    const aside = document.createElement("aside");

    aside.id = "semifinals";
    aside.className = "grupo semifinales";


    aside.innerHTML = `

    <div class="cabecera-grupo">

        <h2>Semifinals</h2>

    </div>


    <div class="fase-final">

        <div class="semifinal">

            <div class="semifinal-partido" data-semifinal="s1">

                <div class="semifinal-equipo semifinal-local" data-origen="dilluns">
                    <span>Guanyador Dilluns</span>
                </div>


                <div class="semifinal-marcador">

                    <input type="number"
                           class="semifinal-gol semifinal-gol-local"
                           min="0"
                           disabled>


                    <span>-</span>


                    <input type="number"
                           class="semifinal-gol semifinal-gol-visitante"
                           min="0"
                           disabled>

                </div>


                <div class="semifinal-equipo semifinal-visitante"
                     data-origen="dimarts">

                    <span>Guanyador Dimarts</span>

                </div>


            </div>


            <div class="semifinal-penaltis oculto">

                <span class="semifinal-icono">
                    🎯
                </span>


                <input type="number"
                       class="semifinal-penal semifinal-penal-local"
                       min="0"
                       disabled>


                <span>-</span>


                <input type="number"
                       class="semifinal-penal semifinal-penal-visitante"
                       min="0"
                       disabled>

            </div>


        </div>




        <div class="semifinal">


            <div class="semifinal-partido" data-semifinal="s2">


                <div class="semifinal-equipo semifinal-local"
                     data-origen="dimecres">

                    <span>Guanyador Dimecres</span>

                </div>


                <div class="semifinal-marcador">

                    <input type="number"
                           class="semifinal-gol semifinal-gol-local"
                           min="0"
                           disabled>


                    <span>-</span>


                    <input type="number"
                           class="semifinal-gol semifinal-gol-visitante"
                           min="0"
                           disabled>

                </div>


                <div class="semifinal-equipo semifinal-visitante"
                     data-origen="dijous">

                    <span>Guanyador Dijous</span>

                </div>


            </div>



            <div class="semifinal-penaltis oculto">

                <span class="semifinal-icono">
                    🎯
                </span>


                <input type="number"
                       class="semifinal-penal semifinal-penal-local"
                       min="0"
                       disabled>


                <span>-</span>


                <input type="number"
                       class="semifinal-penal semifinal-penal-visitante"
                       min="0"
                       disabled>

            </div>


        </div>


    </div>

    `;


    const partidos = aside.querySelectorAll(".semifinal-partido");

	partidos.forEach(partido => {

		partido.addEventListener(
			"input",
			() => controlarEstadoEliminatoria(partido)
		);

	});


	const penaltis = aside.querySelectorAll(".semifinal-penal");

	penaltis.forEach(penal => {

		penal.addEventListener(
			"input",
			() => {

				const semifinal =
					penal.closest(".semifinal");


				const partido =
					semifinal.querySelector(".semifinal-partido");


				controlarEstadoEliminatoria(partido);

			}
		);

	});

    return aside;

}

function crearFinal() {

    const div = document.createElement("div");

    div.id = "final";
    div.className = "grupo final";

    div.innerHTML = `

        <div class="cabecera-grupo">

            <h2>Final</h2>

        </div>


        <div class="final-zona-partit">


            <div class="final-partido" data-final="f1">


                <div class="final-equipo final-local"
                     data-origen="s1">

                    <span>Guanyador S1</span>

                    <img class="final-escut"
                         src=""
                         alt=""
                         hidden>

                </div>


                <div class="final-marcador">

                    <input type="number"
                           class="final-gol final-gol-local"
                           min="0"
                           disabled>

                    <span>-</span>

                    <input type="number"
                           class="final-gol final-gol-visitante"
                           min="0"
                           disabled>

                </div>


                <div class="final-equipo final-visitante"
                     data-origen="s2">

                    <img class="final-escut"
                         src=""
                         alt=""
                         hidden>

                    <span>Guanyador S2</span>

                </div>


            </div>


            <div class="final-penaltis oculto">

                <span class="final-icono">🎯</span>

                <input type="number"
                       class="final-penal final-penal-local"
                       min="0"
                       disabled>

                <span>-</span>

                <input type="number"
                       class="final-penal final-penal-visitante"
                       min="0"
                       disabled>

            </div>


        </div>


        <div class="campio campio-escondit">

            <div class="campio-titol">

                🏆 Campió

            </div>


            <img class="campio-escut"
                 src=""
                 alt=""
                 hidden>


            <div class="campio-nom">

                Pendent de final

            </div>

        </div>

    `;


    const partido = div.querySelector(".final-partido");

    partido.addEventListener(
        "input",
        () => controlarEstadoFinal(partido)
    );


    div.querySelectorAll(".final-penal")
        .forEach(campo => {

            campo.addEventListener(
                "input",
                () => controlarEstadoFinal(partido)
            );

        });


    return div;

}

function actualizarEquipoFaseFinal(origen, equipo) {

    const destino = document.querySelector(
        `.semifinal-equipo[data-origen="${origen}"]`
    );

    if (!destino || !equipo)
        return;

	//console.log("destino ", destino);
	//console.log("equipo ", equipo);
	
    destino.dataset.equipo =
        JSON.stringify(equipo);
	
    destino.innerHTML = `

        <img src="${equipo.escut}" alt="${equipo.nom}">

        <span>${equipo.nom}</span>

    `;

	//console.log("paso inner");

    const partido =
        destino.closest(".semifinal-partido");

	//console.log("partido ", partido);

    if (!partido)
        return;


    const equipos =
        partido.querySelectorAll(".semifinal-equipo");


    const tieneEquipos =
        equipos[0].dataset.equipo &&
        equipos[1].dataset.equipo;


    if (tieneEquipos) {

        habilitarGolesEliminatoria(partido);

    }

}

function actualizarGuanyadorGrup(grupHTML, classificacio) {

    if (!classificacio || classificacio.length === 0)
        return;


    const guanyador = classificacio[0];


    const numeroGrup = parseInt(grupHTML.dataset.grup);


    const origenes = [
        "dilluns",
        "dimarts",
        "dimecres",
        "dijous"
    ];


    actualizarEquipoFaseFinal(
        origenes[numeroGrup],
        guanyador
    );

}

function controlarEstadoEliminatoria(partido) {

    const goles =
        partido.querySelectorAll(".semifinal-gol");

    const gl =
        parseInt(goles[0].value);

    const gv =
        parseInt(goles[1].value);

    if (isNaN(gl) || isNaN(gv)) {
        return;
    }

	const semi =
		partido.closest(".semifinal");

	const bloquePenaltis =
		semi.querySelector(".semifinal-penaltis");

	const camposPenal =
		semi.querySelectorAll(".semifinal-penal");

    // =====================
    // EMPATE
    // =====================

    if (gl === gv) {

		bloquePenaltis.classList.remove("oculto");
		camposPenal.forEach(campo => {
			campo.disabled = false;
		});

		const pl = parseInt(camposPenal[0].value);
		const pv = parseInt(camposPenal[1].value);

		//console.log("pl ", pl);
		//console.log("pv ", pv);

		// Todavía no hay tanda completa
		// Control visual de penaltis empatados
		if (!isNaN(pl) && !isNaN(pv)) {

			if (pl === pv) {

				camposPenal.forEach(campo => {
					campo.classList.add("penal-error");
				});

			} else {

				camposPenal.forEach(campo => {
					campo.classList.remove("penal-error");
				});

			}

		}

		comprobarGanadorEliminatoria(partido);
		return;
	}


    // =====================
    // HAY GANADOR
    // =====================

    bloquePenaltis.classList.add("oculto");


    camposPenal.forEach(campo => {

        campo.disabled = true;
        campo.value = "";

    });


    comprobarGanadorEliminatoria(partido);
	

}

function habilitarPenaltisEliminatoria(partido){

    partido.querySelectorAll(".semifinal-penal")
        .forEach(p => {
            p.disabled=false;
        });

}

function deshabilitarPenaltisEliminatoria(partido){

    partido.querySelectorAll(".semifinal-penal")
        .forEach(p => {
            p.disabled=true;
            p.value="";
        });

}

function controlarEquiposEliminatoria(partido) {

    const local =
        partido.querySelector(".semifinal-local").dataset.equipo;


    const visitante =
        partido.querySelector(".semifinal-visitante").dataset.equipo;


    const activo =
        local && visitante;


    partido.querySelectorAll(".semifinal-gol")
        .forEach(campo => {
            campo.disabled = !activo;

        });


    if (!activo) {
        partido.querySelectorAll(".semifinal-penal")
            .forEach(campo => {

                campo.disabled = true;
                campo.value = "";

            });

    }

}

function habilitarGolesEliminatoria(partido){

    partido.querySelectorAll(".semifinal-gol")
        .forEach(campo => {

            campo.disabled = false;

        });

    const semi =
        partido.closest(".semifinal");

	//console.log("semi", semi);

    semi.querySelectorAll(".semifinal-penal")
        .forEach(campo => {

            campo.disabled = true;
            campo.value = "";

        });

    semi.querySelector(".semifinal-penaltis")
        .classList.add("oculto");

}

function actualizarGanadorSemifinal(origen, equipo) {

    const destino = document.querySelector(
        `#semifinals .semifinal-equipo[data-origen="${origen}"]`
    );


    if (!destino || !equipo)
        return;


    destino.dataset.equipo =
        JSON.stringify(equipo);


    destino.innerHTML = `

        <img src="${equipo.escut}" alt="${equipo.nom}">

        <span>${equipo.nom}</span>

    `;


    const partidoSemi =
        destino.closest(".semifinal-partido");


    if (partidoSemi) {

        const equipos =
            partidoSemi.querySelectorAll(".semifinal-equipo");


        if (
            equipos[0].dataset.equipo &&
            equipos[1].dataset.equipo
        ) {

            habilitarGolesEliminatoria(partidoSemi);

        }

    }

}

function obtenerGanadorEliminatoria(partido) {


    const local =
        partido.querySelector(".semifinal-local");


    const visitante =
        partido.querySelector(".semifinal-visitante");


    if (!local || !visitante)
        return null;


    if (!local.dataset.equipo ||
        !visitante.dataset.equipo) {

        return null;

    }


    const equipoLocal =
        JSON.parse(local.dataset.equipo);


    const equipoVisitante =
        JSON.parse(visitante.dataset.equipo);



    const goles =
        partido.querySelectorAll(".semifinal-gol");


    if (goles.length < 2)
        return null;


    const gl =
        parseInt(goles[0].value);


    const gv =
        parseInt(goles[1].value);



    if (isNaN(gl) || isNaN(gv))
        return null;



    // Victoria por goles

    if (gl > gv)
        return equipoLocal;


    if (gv > gl)
        return equipoVisitante;



    // Empate -> mirar penaltis

    const semi =
        partido.closest(".semifinal");


    if (!semi)
        return null;



    const penales =
        semi.querySelectorAll(".semifinal-penal");


    if (penales.length < 2)
        return null;



    const pl =
        parseInt(penales[0].value);


    const pv =
        parseInt(penales[1].value);



    if (isNaN(pl) || isNaN(pv))
        return null;



    if (pl > pv)
        return equipoLocal;


    if (pv > pl)
        return equipoVisitante;



    // Penaltis empatados
    return null;

}

function comprobarGanadorEliminatoria(partido) {

	//console.log("comprobarGanadorEliminatoria(partido) ", partido);


    if (!partido.dataset.semifinal) {
        console.log("No es semifinal");
        return;
    }


    const ganador =
        obtenerGanadorEliminatoria(partido);


    console.log(
        "GANADOR SEMI:",
        ganador
    );


    if (!ganador) {
		limpiarGanadorSemifinal(
			partido.dataset.semifinal
		);
		return;
	}


    actualizarGanadorSemifinal(
        partido.dataset.semifinal,
        ganador
    );

	actualizarFinalista(
		partido.dataset.semifinal,
		ganador
	);

}

function limpiarGanadorSemifinal(origen) {

    const destino = document.querySelector(
        `#final .semifinal-equipo[data-origen="${origen}"]`
    );

    if (!destino)
        return;


    destino.innerHTML = `
        <span>Pendent</span>
    `;


    delete destino.dataset.equipo;

}

function actualizarFinalista(origen, equipo) {


    const destino = document.querySelector(
        `#final .final-equipo[data-origen="${origen}"]`
    );


    if (!destino || !equipo) {

        console.log("No se puede actualizar finalista");
        return;

    }


    destino.dataset.equipo =
        JSON.stringify(equipo);


    destino.innerHTML = `

        <img src="${equipo.escut}" alt="${equipo.nom}">

        <span>${equipo.nom}</span>

    `;


    const partidoFinal =
        destino.closest(".final-partido");


    if (!partidoFinal)
        return;


    const equipos =
        partidoFinal.querySelectorAll(".final-equipo");


    // Cuando estén los dos finalistas
    if (
        equipos[0].dataset.equipo &&
        equipos[1].dataset.equipo
    ) {

        habilitarGolesFinal(partidoFinal);

    }

}

function habilitarGolesFinal(partido) {


    partido.querySelectorAll(".final-gol")
        .forEach(campo => {

            campo.disabled = false;

        });


    const final =
        partido.closest(".final");


    if (!final)
        return;


    final.querySelectorAll(".final-penal")
        .forEach(campo => {

            campo.disabled = true;
            campo.value = "";

            campo.classList.remove("penal-error");

        });


    const penaltis =
        final.querySelector(".final-penaltis");


    if (penaltis) {

        penaltis.classList.add("oculto");

    }

}

function controlarEstadoFinal(partido) {


    const goles =
        partido.querySelectorAll(".final-gol");


    const gl =
        parseInt(goles[0].value);


    const gv =
        parseInt(goles[1].value);


    if (isNaN(gl) || isNaN(gv)) {
        return;
    }


    const final =
        partido.closest(".final");


    const bloquePenaltis =
        final.querySelector(".final-penaltis");


    const camposPenal =
        final.querySelectorAll(".final-penal");


    // =====================
    // EMPATE
    // =====================

    if (gl === gv) {


        bloquePenaltis.classList.remove("oculto");


        camposPenal.forEach(campo => {

            campo.disabled = false;

        });


        const pl =
            parseInt(camposPenal[0].value);


        const pv =
            parseInt(camposPenal[1].value);



        if (!isNaN(pl) && !isNaN(pv)) {


            if (pl === pv) {


                camposPenal.forEach(campo => {

                    campo.classList.add("penal-error");

                });


            } else {


                camposPenal.forEach(campo => {

                    campo.classList.remove("penal-error");

                });


            }

        }


        comprobarGanadorFinal(partido);

        return;

    }



    // =====================
    // HAY GANADOR
    // =====================


    bloquePenaltis.classList.add("oculto");


    camposPenal.forEach(campo => {

        campo.disabled = true;
        campo.value = "";

        campo.classList.remove("penal-error");

    });

	camposPenal.forEach(campo => {
		campo.classList.remove("penal-error");
	});

    comprobarGanadorFinal(partido);


}

function comprobarGanadorFinal(partido) {

    const ganador =
        obtenerGanadorFinal(partido);

	console.log("GANADOR FINAL:", ganador);
	
    const campio =
        document.querySelector(".campio");
    console.log("CAMPIÓ:", campio);
	// No hay campeón todavía
    if (!ganador) {
        if (campio) {
            campio.classList.add("campio-escondit");
        }
        return;
    }
	
	console.log("LLAMANDO A ACTUALIZAR CAMPIO");
    actualizarCampio(ganador);
}

function obtenerGanadorFinal(partido) {


    const local =
        partido.querySelector(".final-local");


    const visitante =
        partido.querySelector(".final-visitante");


    if (!local.dataset.equipo ||
        !visitante.dataset.equipo) {

        return null;

    }


    const equipoLocal =
        JSON.parse(local.dataset.equipo);


    const equipoVisitante =
        JSON.parse(visitante.dataset.equipo);



    const goles =
        partido.querySelectorAll(".final-gol");


    const gl =
        parseInt(goles[0].value);


    const gv =
        parseInt(goles[1].value);



    if (isNaN(gl) || isNaN(gv)) {

        return null;

    }



    if (gl > gv) {

        return equipoLocal;

    }


    if (gv > gl) {

        return equipoVisitante;

    }



    // Empate: mirar penaltis

    const final =
        partido.closest(".final");


    const penaltis =
        final.querySelectorAll(".final-penal");



    const pl =
        parseInt(penaltis[0].value);


    const pv =
        parseInt(penaltis[1].value);



    if (isNaN(pl) || isNaN(pv)) {

        return null;

    }



    if (pl > pv) {

        return equipoLocal;

    }


    if (pv > pl) {

        return equipoVisitante;

    }



    // Penaltis empatados, todavía no hay campeón

    return null;

}

function actualizarCampio(equipo) {

    const bloque =
        document.querySelector(".campio");

    if (!bloque || !equipo)
        return;

    const escut =
        bloque.querySelector(".campio-escut");

    const nom =
        bloque.querySelector(".campio-nom");

    escut.src =
        equipo.escut;

    escut.alt =
        equipo.nom;

    escut.hidden = false;

    nom.textContent =
        equipo.nom;

    bloque.classList.remove(
        "campio-escondit"
    );
}

/*function crearGrups() {

    const contenidor = document.getElementById("contenedor");
    CONFIG.grups.forEach(grup => {
        contenidor.appendChild(crearGrup(grup));
    });

}*/

function crearGrup(grup) {

    const article = document.createElement("article");
    article.className = "grupo";

    const indiceGrupo = CONFIG.grups.indexOf(grup);

    article.dataset.grup = indiceGrupo;
    //article.dataset.bloqueado = "false";


    article.innerHTML = `
        <div class="cabecera-grupo">

            <h2>${grup.dia}</h2>

            <button 
                class="btn-bloqueo"
                title="Bloquear jornada">
                🔓
            </button>

        </div>

        <table class="clasificacion">
            <thead>
                <tr>
                    <th>Equip</th>
                    <th>PJ</th>
                    <th>Pts</th>
                    <th>GF</th>
                    <th>GC</th>
                    <th>DG</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

        <div class="partidos"></div>
    `;


   /* const boton = article.querySelector(".btn-bloqueo");

    boton.addEventListener("click", () => {

        const bloqueado = article.dataset.bloqueado === "true";

        article.dataset.bloqueado = !bloqueado;

        if (!bloqueado) {

            boton.textContent = "🔒";
            boton.title = "Desbloquear jornada";

            boton.classList.add("bloqueado");
            article.classList.add("grupo-bloqueado");

        } else {

            boton.textContent = "🔓";
            boton.title = "Bloquear jornada";

            boton.classList.remove("bloqueado");
            article.classList.remove("grupo-bloqueado");

        }

    });*/

	inicializarBloqueo(article);
    
	crearClasificacion(article, grup);
    crearEnfrontaments(article, grup);

    return article;

}

function inicializarBloqueo(tarjeta) {

    tarjeta.dataset.bloqueado = "false";

    const boton = tarjeta.querySelector(".btn-bloqueo");

    boton.addEventListener("click", () => {

        const bloqueado = tarjeta.dataset.bloqueado === "true";

        tarjeta.dataset.bloqueado = (!bloqueado).toString();

        if (!bloqueado) {

            boton.textContent = "🔒";
            boton.title = bloqueado ? "Bloquear" : "Desbloquear";

            boton.classList.add("bloqueado");
            tarjeta.classList.add("grupo-bloqueado");

        } else {

            boton.textContent = "🔓";
            boton.title = bloqueado ? "Bloquear" : "Desbloquear";

            boton.classList.remove("bloqueado");
            tarjeta.classList.remove("grupo-bloqueado");

        }

    });

}

function crearClasificacion(article, grup) {

    const tbody = article.querySelector("tbody");

    grup.equips.forEach((equip, index) => {

        const fila = document.createElement("tr");

        fila.dataset.equip = index + 1;

		fila.innerHTML = `
			<td>
				<div class="equip-classificacio">
					<img src="${equip.escut}" alt="${equip.nom}">
					<span>${equip.nom}</span>
				</div>
			</td>
			<td>0</td> <!-- PJ -->
			<td>0</td> <!-- Pts -->
			<td>0</td> <!-- GF -->
			<td>0</td> <!-- GC -->
			<td>0</td> <!-- DG -->
		`;

        tbody.appendChild(fila);

    });

}

function crearEnfrontaments(article, grup){

    const div = article.querySelector(".partidos");
	
			
    CONFIG.partits.forEach((partit,index)=>{

        const html = document.createElement("div");
		const equipLocal = grup.equips[partit.local - 1];

		const equipVisitant =
			partit.visitant === null
				? null
				: grup.equips[partit.visitant - 1];
				
		const textPendent =
			partit.id === 2
				? "Perdedor P1"
				: "Guanyador P1";
					
        html.className="partido";

        html.dataset.id = partit.id;
        html.dataset.local = partit.local;
        html.dataset.visitant = partit.visitant;
        html.dataset.penals = partit.penals;

        html.innerHTML=`
            <div class="equipo local" data-equipo="${partit.local}">
                <img src="${equipLocal.escut}" alt="">
				<span>${equipLocal.nom}</span>
            </div>

            <div class="marcador">
                <input type="number" class="gol gol-local" min="0">

                <span>-</span>

                <input type="number" class="gol gol-visitante" min="0">
            </div>

            <div class="equipo visitante" data-equipo="${partit.visitant}">
                ${equipVisitant
					? `<img src="${equipVisitant.escut}" alt="">
					   <span>${equipVisitant.nom}</span>`
					: `<span class="pendent">${textPendent}</span>`
				}
            </div>

			<div class="penaltis oculto">
				<span class="icono">🎯</span>
				<input type="number" class="penal penal-local" min="0" disabled>
				-
				<input type="number" class="penal penal-visitant" min="0" disabled>
			</div>
        `;

        div.appendChild(html);
		html.addEventListener("input", actualitzarGrup);
		if (partit.id !== 1) {

			html.querySelectorAll(".gol").forEach(campo => {
				campo.disabled = true;
			});

			html.querySelectorAll(".penal").forEach(campo => {
				campo.disabled = true;
			});

		}
    });

}

function actualitzarGrup(evento) {

    //console.log("ENTRA actualitzarGrup");

    const grupHTML =
        evento.currentTarget.closest(".grupo");

    const grupConfig =
        CONFIG.grups[parseInt(grupHTML.dataset.grup)];


    controlarEstadoPartidos(
        grupHTML,
        grupConfig
    );

}

function controlarEstadoPartidos(grupHTML, grupConfig) {

	//console.log("ENTRA controlarEstadoPartidos");

    const p1 = grupHTML.querySelector('.partido[data-id="1"]');

    const p2 = grupHTML.querySelector('.partido[data-id="2"]');

    const p3 = grupHTML.querySelector('.partido[data-id="3"]');

    // =========================
    // PARTIDO 1
    // =========================

    if (!tieneResultado(p1)) {
		//console.log("SALGO: P1 sin resultado");
        return;
    }

    habilitarPenals(p1);

    if (!tienePenaltis(p1)) {
		//console.log("SALGO: P1 penaltis");
        return;
    }

	//console.log("P1 COMPLETO. HABILITO P2");	

    // Aquí ya sabemos ganador/perdedor P1
    const classificacioP1 = calcularClassificacio(
		grupHTML,
		grupConfig,
		1
	);

	const ordenadaP1 = ordenarClassificacio(
		classificacioP1
	);

	pintarClassificacio(
		grupHTML,
		ordenadaP1
	);

	actualitzarCalendari(
		grupHTML,
		grupConfig
	);

	//console.log("P1 terminado. Habilitando P2");
    habilitarGoles(p2);

    // =========================
    // PARTIDO 2
    // =========================

    if (!tieneResultado(p2)) {
		//console.log("SALGO: P2 sin resultado");
        return;
    }


	if (necesitaPenaltisPartido2(
		grupHTML,
		grupConfig
	)) {

		habilitarPenals(p2);


		if (!tienePenaltis(p2)) {
			return;
		}

	}
	else {

		quitarPenaltis(p2);

	}

	const classificacioP2 = calcularClassificacio(
		grupHTML,
		grupConfig,
		2
	);

	const ordenadaP2 = ordenarClassificacio(
		classificacioP2
	);

	pintarClassificacio(
		grupHTML,
		ordenadaP2
	);
		
    habilitarGoles(p3);



    // =========================
    // PARTIDO 3
    // =========================

    if (!tieneResultado(p3)) {
        return;
    }


	if (necesitaPenaltisPartido3(
		grupHTML,
		grupConfig
	)) {

		habilitarPenals(p3);


		if (!tienePenaltis(p3)) {
			return;
		}

	}
	else {

		quitarPenaltis(p3);

	}
	
	const classificacioP3 = calcularClassificacio(
		grupHTML,
		grupConfig,
		3
	);

	const ordenadaP3 = ordenarClassificacio(
		classificacioP3
	);

	pintarClassificacio(
		grupHTML,
		ordenadaP3
	);

    // Aquí ya está todo acabado
	actualizarGuanyadorGrup(
		grupHTML,
		ordenadaP3
	);

	console.log("CLASIFICACIÓN FINAL");

}

function tieneResultado(partido) {

    const goles = partido.querySelectorAll(".gol");

    const local = parseInt(goles[0].value);
    const visitante = parseInt(goles[1].value);

    return (
        !isNaN(local) &&
        !isNaN(visitante)
    );
}

function tienePenaltis(partido) {

    const penales = partido.querySelectorAll(".penal");

    const local = parseInt(penales[0].value);
    const visitante = parseInt(penales[1].value);

    return (
        !isNaN(local) &&
        !isNaN(visitante)
    );
}

function habilitarGoles(partido) {

    const goles = partido.querySelectorAll(".gol");

    goles.forEach(gol => {
        gol.disabled = false;
    });

}

function habilitarPenals(partit) {

    const contenedor = partit.querySelector(".penaltis");

    contenedor.classList.remove("oculto");


    partit.querySelectorAll(".penal")
        .forEach(camp => {
            camp.disabled = false;
        });

}

function actualitzarCalendari(grupHTML, grupConfig) {
	
	//console.log("ENTRA actualitzarCalendari");

    const partit1 = grupHTML.querySelector('.partido[data-id="1"]');

    const gols = partit1.querySelectorAll(".gol");

    const golsLocal = parseInt(gols[0].value);
    const golsVisitant = parseInt(gols[1].value);


    // Si aún no hay resultado
    if (isNaN(golsLocal) || isNaN(golsVisitant)) {
		console.log("Partido ignorado");
		restaurarPartits(grupHTML);
		return;
	}

	// P1 siempre necesita tanda antes de continuar

	const penals = partit1.querySelectorAll(".penal");

	const penalsLocal = parseInt(penals[0].value);
	const penalsVisitant = parseInt(penals[1].value);


	if (
		isNaN(penalsLocal) ||
		isNaN(penalsVisitant)
	) {

		return;

	}

	let guanyador;
	let perdedor;

	if (golsLocal > golsVisitant) {

		guanyador = parseInt(partit1.dataset.local);
		perdedor = parseInt(partit1.dataset.visitant);

	}
	else if (golsVisitant > golsLocal) {

		guanyador = parseInt(partit1.dataset.visitant);
		perdedor = parseInt(partit1.dataset.local);

	}
	else {

		const penals = partit1.querySelectorAll(".penal");

		const penalLocal = penals[0];
		const penalVisitant = penals[1];

		const penalsLocal = parseInt(penalLocal.value);
		const penalsVisitant = parseInt(penalVisitant.value);

		penalLocal.classList.remove("penal-error");
		penalVisitant.classList.remove("penal-error");

		if (isNaN(penalsLocal) || isNaN(penalsVisitant))
			return;

		if (penalsLocal > penalsVisitant) {

			guanyador = parseInt(partit1.dataset.local);
			perdedor = parseInt(partit1.dataset.visitant);

		}
		else if (penalsVisitant > penalsLocal) {

			guanyador = parseInt(partit1.dataset.visitant);
			perdedor = parseInt(partit1.dataset.local);

		}
		else {


			penalLocal.classList.add("penal-error");
			penalVisitant.classList.add("penal-error");
			return;

		}

	}

	/*console.log(
    "Ganador P1:", guanyador,
    "Perdedor P1:", perdedor
	);*/

	const partit2 =
		grupHTML.querySelector('.partido[data-id="2"]');

	const partit3 =
		grupHTML.querySelector('.partido[data-id="3"]');


	actualitzarEquipPartit(
		partit2,
		grupConfig.equips[perdedor - 1],
		perdedor
	);

	actualitzarEquipPartit(
		partit3,
		grupConfig.equips[guanyador - 1],
		guanyador
	);
	
}

function actualitzarEquipPartit(partit, equip, numeroEquip) {

    //console.log("Actualizando partido", partit.dataset.id);


    const equipoActual =
        parseInt(partit.dataset.visitant);


    // Solo limpiamos si realmente cambia el equipo
    const cambiaEquipo =
        equipoActual !== numeroEquip;


    const visitant = partit.querySelector(".equipo.visitante");

    visitant.innerHTML = `
        <img src="${equip.escut}" alt="">
        <span>${equip.nom}</span>
    `;


    partit.dataset.visitant = numeroEquip;


    if (cambiaEquipo) {

        /*console.log(
            "Cambia equipo, limpiando partido",
            partit.dataset.id
        );*/


        partit.querySelectorAll(".gol").forEach(gol => {
            gol.value = "";
        });


        partit.querySelectorAll(".penal").forEach(penal => {
            penal.value = "";
            penal.disabled = true;
        });

    }

}

function pintarClassificacio(grup, classificacio) {

    const files = grup.querySelectorAll("tbody tr");

    classificacio.forEach((equip, index) => {

        const fila = files[index];

        fila.cells[0].innerHTML = `
            <div class="equip-classificacio">
                <img src="${equip.escut}" alt="${equip.nom}">
                <span>${equip.nom}</span>
            </div>
        `;

        fila.cells[1].textContent = equip.pj;
        fila.cells[2].textContent = equip.pts;
        fila.cells[3].textContent = equip.gf;
        fila.cells[4].textContent = equip.gc;
        fila.cells[5].textContent =
            equip.dg > 0 ? "+" + equip.dg : equip.dg;

    });

}

function obtenirEscenariP2(grupHTML) {

    const p1 = grupHTML.querySelector('.partido[data-id="1"]');
    const p2 = grupHTML.querySelector('.partido[data-id="2"]');

    function resultat(partit) {

        const gols = partit.querySelectorAll(".gol");

        const local = parseInt(gols[0].value);
        const visitant = parseInt(gols[1].value);

        if (local > visitant)
            return "L";

        if (local < visitant)
            return "V";

        return "E";
    }

    return resultat(p1) + resultat(p2);

}

function necesitaPenaltisPartido2(grupHTML, grupConfig) {

    //console.log("Evaluando necesidad de penaltis P2");

    const escenario = obtenirEscenariP2(grupHTML);

    const necessita = {
        LL: false,
        LE: false,
        LV: true,
        EL: false,
        EE: true,
        EV: false,
        VL: false,
        VE: false,
        VV: true
    };

    /*console.log(
        "Escenario:", escenario,
        "Penaltis:", necessita[escenario]
    );*/

    return necessita[escenario];

}

function obtenirEscenariP3(grupHTML) {

    const partidos = [
        grupHTML.querySelector('.partido[data-id="1"]'),
        grupHTML.querySelector('.partido[data-id="2"]'),
        grupHTML.querySelector('.partido[data-id="3"]')
    ];


    function resultat(partit) {

        const gols = partit.querySelectorAll(".gol");

        const local = parseInt(gols[0].value);
        const visitant = parseInt(gols[1].value);


        if (local > visitant)
            return "L";

        if (local < visitant)
            return "V";

        return "E";
    }


    return partidos.map(p => resultat(p)).join("");

}

function necesitaPenaltisPartido3(grupHTML, grupConfig) {

    const escenario = obtenirEscenariP3(grupHTML);

    /*console.log(
        "Escenario P3:",
        escenario
    );*/


    const tabla = {

        LLL: false,
        LLE: "R",
        LLV: false,

        LEL: false,
        LEE: false,
        LEV: false,

        LVL: "R",
        LVE: false,
        LVV: false,

        ELL: false,
        ELE: false,
        ELV: false,

        EEL: false,
        EEE: "R",
        EEV: false,

        EVL: false,
        EVE: false,
        EVV: "R",

        VLL: false,
        VLE: "R",
        VLV: false,

        VEL: false,
        VEE: false,
        VEV: false,

        VVL: "R",
        VVE: false,
        VVV: false
    };


    const resultado = tabla[escenario];


    if (resultado === true) {

        console.log(
            "P3 necesita penaltis"
        );

        return true;

    }


    if (resultado === "R") {

        const classificacio =
            calcularClassificacio(
                grupHTML,
                grupConfig,
                3
            );


        ordenarClassificacio(
            classificacio
        );


        if (hayEmpateSinResolver(classificacio)) {

            console.log(
                "P3 necesita penaltis por reglamento"
            );

            return true;

        }

    }


    /*console.log(
        "P3 NO necesita penaltis"
    );*/

    return false;

}

function quitarPenaltis(partit) {

    const contenedor = partit.querySelector(".penaltis");

    const campos = partit.querySelectorAll(".penal");

    campos.forEach(campo => {

        campo.value = "";
        campo.disabled = true;
        campo.classList.remove("penal-error");

    });

    contenedor.classList.add("oculto");

}