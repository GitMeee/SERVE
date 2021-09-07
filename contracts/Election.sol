// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Election{
    
    struct Candidate{
        string name;
        string position;
        uint votecount;
    }
    
    struct Voter{
        bool authorized;
        bool voted;
        uint vote;
    }
    address public owner;
   
   
     
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    uint public totalVotes;
    
    modifier ownerOnly(){
        require(msg.sender==owner);
        _;
    }
    
    constructor() {
        owner=msg.sender;
        
    }
    
    function addCandidate(string memory _name,string memory _position) ownerOnly public{
        candidates.push(Candidate(_name,_position,0));
    }
    

    function authorize(address _person) ownerOnly public{
        if(voters[_person].authorized=false) {
            voters[_person].authorized=true;
        }
        
    }
    
    function getNumCandidate() public view returns(uint) 
    { return candidates.length; }
    
    
    
     
     function showVote(uint i) public view returns(uint){
        uint count= uint(candidates[i].votecount);
        return count;
        
     }
 
    
    function vote(uint _voteIndex)public{
        require(!voters[msg.sender].voted);
        require(voters[msg.sender].authorized);
        
        voters[msg.sender].vote= _voteIndex;
        voters[msg.sender].voted=true;
        
        candidates[_voteIndex].votecount +=1;
        totalVotes +=1;
    }
    
    function end() ownerOnly public{
        
        address payable addr = payable (address(msg.sender));
        selfdestruct(addr);
    }
    
  
    function getMyStruct() public view returns(Candidate[] memory) {
     return candidates;
    }
    
    function getCandidate(uint index)public view returns(string memory,string memory) {
        return (candidates[index].name, candidates[index].position);
    }
    
    
    
    
    function getUser() public view returns(bool,bool,uint){
        return get(msg.sender);
    }
    
    function get(address userAddress)public view returns(bool,bool,uint)
    {
    return(
     voters[userAddress].authorized,
     voters[userAddress].voted,
     voters[userAddress].vote);
    }
    
    
    
   
    }
 
    
