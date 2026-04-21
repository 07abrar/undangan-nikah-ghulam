import {useState, useEffect} from 'react';

type Wish = {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

export default function Wishes() {
    const [wishes, setWishes] = useState<Wish[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    // Fetch Wishes
    useEffect(() => {
        fetch('/api/wishes/')
            .then(response =>  response.json())
            .then(data => {
                setWishes(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);

    // Submit Wishes
    async function handleSubmit() {
        try {
        const response = await fetch('/api/wishes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, message })
            });

            const newWish = await response.json();
            setWishes([...wishes, newWish]);
            setName('');
            setMessage('');
        } catch (error) {
            setError((error as Error).message);
        }
        }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Wishes</h2>
            <ul>
                {wishes.map(wish => (
                    <li key={wish.id}>
                        <strong>{wish.name}</strong>: {wish.message} <em>({new Date(wish.created_at).toLocaleString()})</em>
                    </li>
                ))}
            </ul>
            <h2>Submit a Wish</h2>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nama"
            />
            <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your Wish"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}