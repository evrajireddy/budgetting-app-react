import { useEffect, useState } from 'react'

function Home() {

    const [transactions, setTransactions] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3456/transactions`)
            .then(responseP => responseP.json())
            .then(dataP => {
                console.log("after github projects success");
                console.log(dataP);
                setTransactions(dataP);
                console.log(dataP);
                let totalValue = dataP.reduce((accumulator, transaction) => { return accumulator + transaction.amount }, 0);
                setTotalValue(totalValue);
            }).catch(error => console.error('Error: fetching github project details failed:', error));
    }, []);
    const getTdData = transactions.map((transaction) =>
        <tr key={transaction.id}><td>{transaction.date}</td>
            <td>{transaction.item_name}</td>
            <td>{transaction.from}</td>
            <td>{transaction.amount}</td>
        </tr>
    );

    return (
        <div >
            Bank Account Total: {totalValue}
            <table>{getTdData}</table>
        </div>
    )
}

export default Home;