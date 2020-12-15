import React, {useEffect, useState} from 'react';
import Button from '../../components/Button';
import NewTransaction from '../../components/NewTransaction';
import useFetch from '../../utils/useFetch';
import formatValue from '../../utils/formatValue';
import { format } from 'date-fns'
import { Container } from './styles';
import { RiAddCircleFill } from "react-icons/ri";

const Transactions = ()=> {

    const { data, setData, loading, error, request } = useFetch();
    const [ newTransaction, setNewTransaction ] = useState(false) 

    function handleCreateTransaction(){
        setNewTransaction(true)
    }

    useEffect(() => {
        request('http://localhost:3000/transactions/', {method: 'GET'});
    }, [request]);

    if(error){
        return  <p>{error}</p> 
    }else if(loading){
        return  <p>Carregando...</p> 
    }else if(data){
        return (
            <Container>
                <header>
                    <label>Número de transações</label>
                    <p>{data.filter((transaction)=> transaction.amount).length}</p>
    
                    <label>Valor total</label>
                    <p>{ formatValue(data.reduce((total, transaction)=> (total + transaction.amount), 0) )}</p>
                </header>
    
                <ul>
                    {data.filter((transaction) => transaction.amount)
                        .map((transaction) => (
                            <li key={transaction.id}>
                            <div className="container-name-data-time">
                                <p className="name">{transaction.credit_card_holder_name}</p>
                                <p className="data-time">{format(new Date(transaction.date), "dd/MM/yyyy HH:mm")}</p>
                            </div>
                            <div className="container-status-value">
                                <p className="status">{transaction.status === 'paid' ? 'Paga' : 'Recusada'}</p>
                                <p className="value">{formatValue(transaction.amount)}</p>
                            </div>
                        </li>   
                    ))}
                </ul>
    
                <Button 
                    icon={ <RiAddCircleFill color={'#DFD5FF'} size={20}/> } 
                    onClick={handleCreateTransaction}
                >
                    Criar transação
                </Button>

                <NewTransaction setData={setData} setNewTransaction={setNewTransaction} newTransaction={newTransaction}/>
            </Container>
        );
    }else return null
}

export default Transactions;