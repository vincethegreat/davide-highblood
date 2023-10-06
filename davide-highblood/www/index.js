// Open or create the database
var db = window.openDatabase("MyDatabase", "1.0", "Cordova Database", 2 * 1024 * 1024);

// Create the table if it doesn't exist
db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS data (input1, input2, input3, input4)");
});

function saveData() {
    var input1 = document.getElementById("input1").value;
    var input2 = document.getElementById("input2").value;
    var input3 = document.getElementById("input3").value;
    var input4 = document.getElementById("input4").value;

    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO data (input1, input2, input3, input4) VALUES (?, ?, ?, ?)",
            [input1, input2, input3, input4],
            function(tx, result) {
                alert("Data saved successfully!");
                fetchAndDisplayData();
            },
            function(tx, error) {
                console.error("Error saving data: " + error.message);
            }
        );
    });
}

function fetchAndDisplayData() {
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM data", [], function(tx, result) {
            var dataBody = document.getElementById("dataBody");
            dataBody.innerHTML = ""; // Clear previous data

            for (var i = 0; i < result.rows.length; i++) {
                var row = result.rows.item(i);
                var newRow = document.createElement("tr");
                newRow.innerHTML = "<td>" + row.input1 + "</td>" +
                                  "<td>" + row.input2 + "</td>" +
                                  "<td>" + row.input3 + "</td>" +
                                  "<td>" + row.input4 + "</td>";
                dataBody.appendChild(newRow);
            }
        });
    });
}

// Initial data fetch on app startup
document.addEventListener("deviceready", fetchAndDisplayData, false);
