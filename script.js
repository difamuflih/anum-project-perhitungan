function calculateAnnuity() {
  var pinjamanAwal = parseFloat(document.getElementById("pinjamanAwal").value);
  var sukuBunga = parseFloat(document.getElementById("sukuBunga").value) / 100;
  var target = parseFloat(document.getElementById("target").value);
  var jumlahCicilan = parseFloat(
    document.getElementById("jumlahCicilan").value
  );

  const cicilanAwal =
    (pinjamanAwal * sukuBunga) / (1 - (1 + sukuBunga) ** -jumlahCicilan);
  document.getElementById(
    "hasilCicilan"
  ).innerText = `Hasil Anuitas Awal: ${cicilanAwal.toFixed(2)}`;

  var monthlyPayment = cicilanAwal - target;
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  var labels = [];
  var data = [];
  var monthlyPaymentData = [];
  var faksenData = [];

  var remainingBalance =
    (pinjamanAwal * sukuBunga) / (1 - (1 + sukuBunga) ** -monthlyPayment) -
    target;
  console.log(remainingBalance);
  var faksen =
    (pinjamanAwal * sukuBunga * (1 + sukuBunga) ** -monthlyPayment) /
    (1 - (1 + sukuBunga) ** -monthlyPayment) ** 2;
  console.log(faksen);

  for (var month = 1; month <= 200; month++) {
    var newRow = document.createElement("tr");
    newRow.innerHTML =
      "<td>" +
      month +
      "</td><td>" +
      monthlyPayment.toFixed(2) +
      "</td><td>" +
      remainingBalance.toFixed(2) +
      "</td><td>" +
      faksen.toFixed(2) +
      "</td>";
    tableBody.appendChild(newRow);

    var exMonthlyPayment = monthlyPayment;
    monthlyPayment = monthlyPayment - remainingBalance / faksen;
    console.log(monthlyPayment);

    // toleransi
    if (exMonthlyPayment - monthlyPayment < 0.01) {
      document.getElementById(
        "hasilIterasi"
      ).innerText = `Nilai n yang mendekati solusi optimal adalah: ${exMonthlyPayment.toFixed(
        2
      )}`;
      document.getElementById(
        "hasilAksen"
      ).innerText = `Jumlah iterasi yang dibutuhkan: ${month}`;
      break;
    }

    remainingBalance =
      (pinjamanAwal * sukuBunga) / (1 - (1 + sukuBunga) ** -monthlyPayment) -
      target;

    faksen =
      (pinjamanAwal * sukuBunga * (1 + sukuBunga) ** -monthlyPayment) /
      (1 - (1 + sukuBunga) ** -monthlyPayment) ** 2;

    labels.push(month);
    data.push(remainingBalance.toFixed(2));
    monthlyPaymentData.push(monthlyPayment.toFixed(2));
    faksenData.push(faksen.toFixed(2));
  }

  var ctx = document.getElementById("annuityChart").getContext("2d");
  var annuityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Nilai x(n)",
          data: data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Nilai f(x)",
          data: monthlyPaymentData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Nilai f'(x)",
          data: faksenData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
