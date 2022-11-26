function tampilPenjelasan() {
	//penjelasan
	$("#inputMatriks").append(
		"<p class='small alert alert-info col-md-12'>" +
		"<strong>Pairwaise Comparison :</strong><br />" +
		"1 - sama penting<br />" +
		"3 - sedikit lebih penting <br />" +
		"5 - Lebih Penting<br />" +
		"7 - Sangat Penting<br />" +
		"9 - Mutlak Penting<br />" +
		"2,4,6,8 - Intermediate<br />" +
		"</p>");
}


function tampilInputMatriks(matriks, kriteria) {
	$("#inputMatriks").empty();
	$("#inputMatriks").append("<hr/>");
	tampilPenjelasan();

	// untuk baris Kolom kriteria atas
	$("#inputMatriks").append("<br><div id='row-pertama' class='row align-middle '></div>");
	for (var i = 0; i < kriteria.length; i++) {
		if (i == 0) $("#inputMatriks #row-pertama").append("<div class='col-md-1'></div>");
		$("#inputMatriks #row-pertama").append(
			"<div class='col-md-1'>" + kriteria[i] + "</div>"
		);
	}

	for (var i = 0; i < matriks.length; i++) {
		$("#inputMatriks").append("<div id='row" + i + "' class='row align-middle '></div>");

		$("#inputMatriks #row" + i).append(
			"<div class='col-md-1' >" + kriteria[i] + "</div>"
		);

		for (var z = 0; z < matriks[i].length; z++) {

			$("#inputMatriks #row" + i).append( // tampil nilai matriks
				"<div class='col-md-1'><input class='text-center form-control' type='text' name='matriks[" + i + "][" + z + "]' value='" + matriks[i][z] + "'/></div>"
			);
			//if (i==z) disabled input *belum

		}
	}

	$("#inputMatriks").append("<br><a href='#wadahMatriksNormalised' onclick='btnNormalise(" + matriks.length + ")' class='btn btn-primary'>Normalise</a>");

}

function tampilInputKriteria(n) {
	$("#inputKriteria").empty();
	for (i = 0; i <
		n; i++) {
		$("#inputKriteria").append("<div class='input-group col-md-12'>" +
			"<span class='input-group-addon'>" + (parseInt(i) + 1) + "</span>" +
			"<input type='text' class='kriteria form-control' name='kriteria[" + i + "]'/>" +
			"<span class='input-group-addon' style='padding: 0px 0px;'>" +
			"<select name='jenis[" + i +
			"]' class='input-sm btn-primary' style='margin: 0px; border-radius: 0px;'>" +
			"<option value='Keuntungan' selected='selected'>Keuntungan</option>" +
			"<option value='Beban'>Beban</option>" +
			"</select>" +
			"</span>" +

			"</div>" +
			"<br>"

		);
	}
}

function tampilInputAlternatif(a) {
	$("#inputAlternatif").empty();
	for (i = 0; i < a; i++) {
		$("#inputAlternatif").append("<div class='input-group col-md-12'>" +
			"<span class='input-group-addon'>" + (parseInt(i) + 1) + "</span>" +
			"<input type='text' class='form-control' name='alternatif[" + i + "]' />" +
			"</div>" +
			"<br>"

		);
	}
}




function tampilMatriksNormalised(matriksNormalised, cr, divLocation) {
	$(divLocation).empty();
	$(divLocation).append("<hr/><h5 class='pb-2'>Hasil Normalisasi : CR=" + cr.toFixed(2) + "</h5>");
	$(divLocation).append("<div class='row'><div class='col-md-8'><table class='table table-striped table-bordered'><tbody></tbody></table></div></div>");

	for (var i = 0; i < matriksNormalised.length; i++) {
		$(divLocation + " table tbody").append("<tr id='rowTable" + i + "'></tr>");

		for (var z = 0; z < matriksNormalised[i].length; z++) {
			$("#rowTable" + i).append(
				"<td>" + matriksNormalised[i][z].toFixed(2) + "</td>"
			);

		}
	}

	// $(divLocation).append("<button type='submit' class='mt-3 btn btn-sm btn-primary'>Simpan</button>");
}

function tampilBobot(bobot, kriteria, divLocation) {
	$(divLocation).empty();
	$(divLocation).append("<ul class='list-group list-group-sm'></ul>");
	for (var z = 0; z < bobot.length; z++) {
		$(divLocation + " ul").append(
			"<li class='list-group-item text-left font-weight-bold'>" + kriteria[z] + " : <span class='pull-right small badge badge-primary'>" + bobot[z].toFixed(2) + "</span></li>"
		);

	}

	// $(divLocation).append("<button type='submit' class='mt-3 btn btn-sm btn-primary'>Simpan</button>");
}









/*---- OPERASI MATRIKS ----*/


function BuatMatriksKosong(ordo) {
	ordo = parseInt(ordo); //deklarasi size matriks ordo nxn
	var matriks = new Array(ordo);
	for (i = 0; i < ordo; i++) {
		matriks[i] = new Array(ordo);
	}
	return matriks;
}

function buatMatriks(ordo) {
	matriks = BuatMatriksKosong(ordo);

	for (var baris = 0; baris < ordo; baris++) { //isi nilai awal matriks
		for (var kolom = 0; kolom < ordo; kolom++) {
			if (baris == kolom) {
				matriks[baris][kolom] = 1;
			} else {
				matriks[baris][kolom] = 0;
			}
		}
	}
	return matriks;
}


function sumColumns(matriks) {
	var sumCol = [];
	for (var kolom = 0; kolom < matriks.length; kolom++) {
		sumCol[kolom] = 0;
		for (var baris = 0; baris < matriks.length; baris++) {
			sumCol[kolom] = sumCol[kolom] + matriks[baris][kolom];
		}
	}
	return sumCol; //array sumColumns per Column
}

function sumRows(matriks) {
	var sumRow = [];
	for (var baris = 0; baris < matriks.length; baris++) {
		sumRow[baris] = 0;
		for (var kolom = 0; kolom < matriks.length; kolom++) {
			sumRow[baris] = sumRow[baris] + matriks[baris][kolom];
		}
	}
	return sumRow; //array sumRows per Row
}

function averageRows(matriks) {
	var sumRow = sumRows(matriks);
	for (var i = 0; i < sumRow.length; i++) {
		sumRow[i] = sumRow[i] / sumRow.length;
		// sumRow[i]=sumRow[i].toFixed(2);
	}
	return sumRow; //array averageRows per Row
}

function averageOrdoSatu(matriks) {
	var hasil = 0;
	for (var z = 0; z < matriks.length; z++) {
		hasil += matriks[z];
	}
	return hasil / matriks.length; //satu nilai
}







/*---- OPERASI AHP ----*/

function normalise(matriks, sumCol) {
	normalised = BuatMatriksKosong(matriks.length);
	for (var baris = 0; baris < matriks.length; baris++) {
		for (var kolom = 0; kolom < matriks.length; kolom++) {
			normalised[baris][kolom] = matriks[baris][kolom] / sumCol[kolom];
		}
	}
	return normalised;
}


function cekKonsistensi(matriks, bobotKriteria) {
	//weighted sum value(hasil kali matriks pairwaise dan matriks bobotkriteria)
	var weightedPairwaise = []
	for (var i = 0; i < matriks.length; i++) {
		weightedPairwaise[i] = 0;
		for (var z = 0; z < matriks.length; z++) {
			weightedPairwaise[i] = weightedPairwaise[i] + (matriks[i][z] * bobotKriteria[z]);
		}
	}
	//lambda
	lambda = [];
	for (var z = 0; z < matriks.length; z++) {
		lambda[z] = weightedPairwaise[z] / bobotKriteria[z];
	}
	lambda = averageOrdoSatu(lambda);
	//cr
	var ci = (lambda - matriks.length) / (matriks.length - 1);
	var ir = 1.98 * (matriks.length - 2) / matriks.length;
	var cr = ci / ir;

	if (cr < 0.10) return [true, cr];
	else return [false, cr];
}









function btnNormalise(ordo) {
	matriks = BuatMatriksKosong(ordo);
	var kriteria = [];
	$(".kriteria").each(function () {
		kriteria.push($(this).val());
	});

	//ambil nilai dari tag input
	for (var i = 0; i < ordo; i++) {
		for (var z = 0; z < ordo; z++) {
			matriks[i][z] = new Number($("input[name='matriks[" + i + "][" + z + "]']").val());
			if (isNaN(matriks[i][z])) {
				var bagi = $("input[name='matriks[" + i + "][" + z + "]']").val().split('/');
				matriks[i][z] = new Number(bagi[0] / bagi[1]); //.toFixed(2) bulatkan 2 dan menjadi string
			}
		}
	}

	// sum col matriks
	var sumCol = sumColumns(matriks);

	// normalisasi matriks
	var matriksNormalised = normalise(matriks, sumCol);

	//hitung bobot/w/vector/rata2 baris
	var bobotKriteria = averageRows(matriksNormalised);

	//cek konsistensi
	var cek = cekKonsistensi(matriks, bobotKriteria);
	if (cek[0]) {
		//tampilkan
		tampilMatriksNormalised(matriksNormalised, cek[1], "#wadahMatriksNormalised");
		$("#wadahMatriksNormalised .row").append("<div id='wadahBobot' class='col-md-4'><div>")
		tampilBobot(bobotKriteria, kriteria, "#wadahBobot");

		//array normasilsasi dan bobotKriteria buatkan hidden input;
		$("#wadahMatriksNormalised").append("<input type='hidden' name='matriksNormalised' value=" + JSON.stringify(matriksNormalised) + " />")
		$("#wadahMatriksNormalised").append("<input type='hidden' name='bobotKriteria' value=" + JSON.stringify(bobotKriteria) + " />")

		//tampil tombol submit form
		$("#wadahMatriksNormalised").append("<button type='submit' class='mt-3 btn btn-sm btn-primary'>Simpan Preference</button>");
	} else {
		$("#wadahMatriksNormalised").empty();
		$("#wadahMatriksNormalised").append("<div class='alert alert-warning col-6 text-center'>cr =" + cek[1].toFixed(3) + " | tidak konsisten, periksa kembali matriks anda</div>")
	}

	// console.log(matriks);
	// console.log(bobotKriteria);
	//console.log(cekKonsistensi(matriks,bobotKriteria));
	console.log(JSON.stringify(matriksNormalised))
	console.log(JSON.stringify(bobotKriteria))


}



function btnProceed() {
	var empty = true;
	$(".kriteria").each(function () {
		if ($(this).val() != "") {

			empty = false;
			return false;
		}
	});
	alert('siaap');

	if (!empty) {
		var kriteria = [];
		$(".kriteria").each(function () {
			kriteria.push($(this).val());
		});

		var x = $("#n").children("option:selected").val();
		var matriks = buatMatriks(x);

		$("#wadahMatriksNormalised").empty(); //seandainya so sampe normalisasi, hapus normalisasi tampilan
		tampilInputMatriks(matriks, kriteria);

	}



}

// $('#n').keyup(function(){
// 	// if (event.keyCode === 13) {
// 	// 	btnProceed()
// 	// }

// 	// var x = $("#n").first().val();// var x = $("#n")[0].value;
// 	tampilInputKriteria(x);
// });


$("#n").change(function () {
	var x = $(this).children("option:selected").val();
	tampilInputKriteria(x);
})

$("#a").change(function () {
	var x = $(this).children("option:selected").val();
	tampilInputAlternatif(x);
})


/*
pahami lagi DOM pada jquery ada di FB; bisa juga dengan consolelog dpe element, cos dpe inti itu element pe dom bgmn
*/
