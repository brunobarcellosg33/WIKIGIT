import { useState } from 'react';
import gitLogo from '../assets/img/githublogo.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api'

import {Container} from './styles';
 
function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`repos/${currentRepo}`);
      
      if (data && data.id) {

        const isExist = repos.find(repo => repo.id === data.id)

        if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      } else {
        alert('Repositório não encontrado');
      }
    }} catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado');
      } else {
        console.error("Erro ao buscar repositório:", error);
      }
    }
  };

  const handleRemoveRepo =(id) => {
    setRepos((prevRepos) => {
      const uptatedRepos = prevRepos.filter((repo) => repo.id !== id);
      return uptatedRepos;

    });
  };


  return (
    <Container>
     <img src={gitLogo} width={72} height={72} alt="GitHub Logo" />
     <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
     <Button onClick={handleSearchRepo} />
     {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}

    </Container>
  );
}

export default App;
