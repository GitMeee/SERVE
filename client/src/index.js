
$(function(){
  if($('body').is('.adminAdd')){
    electionApp();
  }
  else if($('body').is('.adminAuthorize')){
    authorize();
  }
});
     

const getNumCandidate = async (election, contract) => {
  election = await contract.methods.getNumCandidate().call();
  $("#count").html(election);
};



const addCandidate = async (election, contract, accounts) => {
  let name,position;
  $("#name").on("change", (e) => {
    name = e.target.value;
  });
  
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    await contract.methods
      .addCandidate(name,$( "#position option:selected" ).text())
      .send({ from: accounts[0], gas: 3000000 });
      
      location.reload();
    
return false;
  });

};



const authorizeCandidate = async (election, contract, accounts) => {
  let address
  $("#address").on("change", (e) => {
    address = e.target.value;
  });
  $("#authorizeform").on("submit", async (e) => {
    e.preventDefault();
    await contract.methods
      .authorize(address)
      .send({ from: accounts[0], gas: 3000000 });
      alert("Successfully Authorized "+address);
    location.reload();
return false;
  })

};




const displayCandidate = async (election, contract, accounts) => {
  var candidatesResults = $("#candidatesResults");
  candidatesResults.empty();
election = await contract.methods.getNumCandidate().call();
for (var i = 0; i < election; i++) {
  var candidate=await contract.methods.getCandidate(i).call();
      var name = candidate[0];
      var position = candidate[1];
      var candidateTemplate = "<tr><td>" + name + "</td>" +"<td>" + position + "</td></tr>";
      $('#candidatesResults').append(candidateTemplate);
}
}

async function electionApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  let election;

  getNumCandidate(election, contract);
  addCandidate(election, contract, accounts);
  displayCandidate(election, contract, accounts);
  
}

async function authorize() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  let election;

  authorizeCandidate(election, contract, accounts);
  
}


function navFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}








 




