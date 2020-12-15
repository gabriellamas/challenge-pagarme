import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useForm from '../../utils/useForm';
import useFetch from '../../utils/useFetch';
import { Container } from './styles';
import { RiArrowLeftLine } from "react-icons/ri";

const NewTransaction = ({newTransaction, setNewTransaction, setData})=> {

    const { data, loading, error, request } = useFetch();

    const buyerName = useForm('text');
    const cpf = useForm('cpf');
    const cardNumber = useForm('creditCard');
    const creditCardExpiry = useForm('creditCardExpiry');
    const cvv = useForm('text');
    const transactionValue = useForm('transactionValue');

    const [buttonDisabled, setButtonDisabled] = useState(true);

    async function handleSubmit(event) {
        event.preventDefault();

        if (    buyerName.validate() && 
                cpf.validate()  && 
                cardNumber.validate() && 
                creditCardExpiry.validate() && 
                cvv.validate() && 
                transactionValue.validate()
         ) {

            const dateToArray =  creditCardExpiry.value.replace(/\D/g,'').split('');
            const cardExpirationDateFormated = dateToArray[0] + dateToArray[1] + dateToArray[4] + dateToArray[5];

            const finalObject = {
                buyer_document: cpf.value.replace(/\D/g,''),
                credit_card_holder_name: buyerName.value,
                credit_card_number: cardNumber.value.replace(/\D/g,''),
                credit_card_expiration_date: cardExpirationDateFormated,
                credit_card_cvv: cvv.value,
                amount: parseFloat(transactionValue.value.replace('.','').replace(',','.').replace('R$ ',''))
            }
            
            const response = await request('http://localhost:3000/transactions/', 
            {
                method: 'POST', 
                body: JSON.stringify(finalObject),
                headers: {
                    "Content-Type" : "application/json"
                }
            });

            setData( old => ([...old, {
                buyer_document: response.json.buyer_document,
                credit_card_holder_name: response.json.credit_card_holder_name,
                credit_card_number: response.json.credit_card_number,
                credit_card_expiration_date: response.json.credit_card_expiration_date,
                credit_card_cvv: response.json.credit_card_cvv,
                amount: response.json.amount,
                status: response.json.status,
                date: response.json.date,
                id: response.json.id
            }]))

            buyerName.setValue('')
            cpf.setValue('') 
            cardNumber.setValue('')
            creditCardExpiry.setValue('')
            cvv.setValue('')
            transactionValue.setValue('')

            setNewTransaction(false)
        }
    }

    function handleBack(){
        setNewTransaction(false)
    }

    useEffect(() => {

        const finalValuesToSend = {
            buyerName: buyerName.value,
            cpf: cpf.value,
            cardNumber: cardNumber.value,
            creditCardExpiry: creditCardExpiry.value,
            cvv: cvv.value,
            transactionValue: transactionValue.value,
        }

        if(
            finalValuesToSend.buyerName &&
            finalValuesToSend.cpf &&
            finalValuesToSend.cardNumber &&
            finalValuesToSend.creditCardExpiry &&
            finalValuesToSend.cvv &&
            finalValuesToSend.transactionValue){
                setButtonDisabled(false)
            }else{
                setButtonDisabled(true)
            }

    }, [buyerName, cpf, cardNumber, creditCardExpiry, cvv, transactionValue]);


    if(error){
        return <p>{error}</p>
    }else{
        return( 
            <Container newTransaction={newTransaction}>
                <header>
                    <button type="button" onClick={handleBack}>
                    <RiArrowLeftLine size={16} color={"#6045AF"}/>
                    </button>
                    <h3>Nova transação</h3>     
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="container-inputs">
                        <Input
                            label="Nome da pessoa compradora"
                            id="buyer-name"
                            type="text"
                            placeholder="Nome da pessoa compradora"
                            className="custom-input"
                            {...buyerName}
                        />
                        <Input
                            label="CPF"
                            id="cpf"
                            type="text"
                            placeholder="CPF"
                            className="custom-input"
                            {...cpf}
                        />
                        <Input
                            label="N° do cartão"
                            id="card-number"
                            type="text"
                            placeholder="N° do cartão"
                            className="custom-input"
                            {...cardNumber}
                        />
                        <div className="flex-area">
                            <Input
                                label="Data de expiração"
                                id="expires-date"
                                type="text"
                                placeholder="Data de expiração"
                                className="custom-input expiration-date"
                                maxLength="7"
                                {...creditCardExpiry}
                            />
                            <Input
                                label="CVV"
                                id="cvv"
                                type="text"
                                placeholder="CVV"
                                maxLength="3"
                                className="custom-input cvv-input"
                                {...cvv}
                            />
                        </div>
                        <Input
                            label="Valor da transação"
                            id="card"
                            type="text"
                            placeholder="Valor da transação"
                            className="custom-input"
                            {...transactionValue}
                        />
                    </div>
                    <Button disabled={buttonDisabled} onClick={handleSubmit}>
                        Criar transação
                    </Button>
                </form>
            </Container>
        )
    }
} ;

export default NewTransaction;