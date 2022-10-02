function parseXML(xmlString) {
  var parser = new DOMParser();
  
  var docError = parser.parseFromString("INVALID", "text/xml");
  var parsererrorNS = docError.getElementsByTagName("parsererror")[0].namespaceURI; 

  var doc = parser.parseFromString(xmlString, "text/xml");
  if (doc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
    throw new Error("Error parsing XML");
  }
  return doc;
}

var xmlString =
  "<?xml version = '1.0'?>" +
  "<workers> " +
  "   <worker> " +
  "       <name> " +
  "           <last_name>Красавич</last_name> " +
  "           <first_name>Максим</first_name> " +
  "           <middle_name>Андрійович</middle_name> " +
  "       </name> " +
  "       <education>Вища освіта</education> " +
  "       <position>Junior Software Engineer</position> " +
  "       <degree>Бакалавр комп'ютерних наук</degree> " +
  "       <salary>30000</salary> " +
  "   </worker> " +
  "   <worker> " +
  "       <name> " +
  "           <last_name>Багатий</last_name> " +
  "           <first_name>Андрій</first_name> " +
  "           <middle_name>Сергійович</middle_name> " +
  "       </name> " +
  "       <education>Вища освіта</education> " +
  "       <position>Middle Software Engineer</position> " +
  "       <degree>Бакалавр комп'ютерних наук</degree> " +
  "       <salary>60000</salary> " +
  "   </worker> " +
  "   <worker> " +
  "       <name> " +
  "           <last_name>Кіт</last_name> " +
  "           <first_name>Анатолій</first_name> " +
  "           <middle_name>Олександрович</middle_name> " +
  "       </name> " +
  "       <education>Вища освіта</education> " +
  "       <position>Менеджер проекту</position> " +
  "       <degree>Доктор технічних наук</degree> " +
  "       <salary>55000</salary> " +
  "   </worker> " +
  "</workers> ";

function Employee(pName, pPosition, pEducation, pDegree, pSalary) {
  this.name = pName;
  this.position = pPosition;
  this.education = pEducation;
  this.degree = pDegree;
  this.salary = pSalary;

  this.info = `${this.name}; ${this.education}; ${this.salary}.`;
}

var workers = [];

function searchEmployee(e) {
  console.log(xmlString);
  var doc;

  try {
    doc = parseXML(xmlString);
    console.log(doc.documentElement);
  } catch (e) {
    alert(e);
    return;
  }
  resetLog();

  var rootElement = doc.documentElement;
  //
  var children = rootElement.childNodes;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    
    if (child.nodeType == Node.ELEMENT_NODE) {
      var lastNameElement = child.getElementsByTagName("last_name")[0];
      var firstNameElement = child.getElementsByTagName("first_name")[0];
      var middleNameElement = child.getElementsByTagName("middle_name")[0];
      var educationElement = child.getElementsByTagName("education")[0];
      var positionElement = child.getElementsByTagName("position")[0];
      var degreeElement = child.getElementsByTagName("degree")[0];
      var salaryElement = child.getElementsByTagName("salary")[0];

      var name = `${lastNameElement.textContent} ${firstNameElement.textContent} ${middleNameElement.textContent}`;
      var education = educationElement.textContent;
      var position = positionElement.textContent;
      var degree = degreeElement.textContent;
      var salary = salaryElement.textContent;

      appendLog("Ім'я: " + name);
      appendLog("Освіта: " + education);
      appendLog("Посада: " + position);
      appendLog("Науковий ступінь: " + degree);
      appendLog("Заробітна плата: " + salary + "\n");

      workers.push(new Employee(name, position, education, degree, salary));
    }
    if (i == children.length - 1) {
      getTheHighestSalary();
    }
  }
}

function resetLog() {
  document.getElementById("textarea-log").value = "";
}

function appendLog(msg) {
  document.getElementById("textarea-log").value += "\n" + msg;
}

function getTheHighestSalary() {
  var maxPremiumWorker = workers.reduce((prev, curr) => (prev.salary > curr.salary ? prev : curr));
  document.getElementById("result").innerHTML = maxPremiumWorker.info;
}
