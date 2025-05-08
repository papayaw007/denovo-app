import React from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Summarize() {

    const location = useLocation();
    const selected = location.state?.selected;

   
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const summarizeText = async () => {
    setLoading(true);
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', 
        {
          model: 'gpt-4', 
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Summarize the following text into a summary blog of the actual blog into 600 characters: ${selected.article}` },
          ],
          max_tokens: 100, 
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSummary(response.data.choices[0].message.content.trim()); 
    } catch (error) {
   
      if (axios.isAxiosError(error)) {
        if (error.response) {
  
          setError(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          setError('No response received from the server');
        } else {
          setError(`Request error: ${error.message}`);
        }
      } else {
        setError(`General Error: ${error.message || error}`);
      }
    }
    setLoading(false);
  };

 
  
  return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-indigo-200'>
        <div className='flex flex-col justify-center items-center bg-white w-1/2 p-10 space-y-10 rounded-lg'>
        <div className='flex justify-between space-x-72'>
        <Link to={'/'} >
            <button className='flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg mb-5 hover:bg-indigo-700'>
            <FiArrowLeft style={{ marginRight: '5px' }} />
                <div>Back</div></button>
        </Link>
        <div className='text-2xl font-semibold'>AI Summarizer</div>
        </div>
            <div className='w-xl rounded-lg bg-gray-100 p-5'>
                <p>{selected.article}</p>
            </div>
            <div>
                <button  onClick={summarizeText} className='flex py-2 px-4 bg-indigo-500 rounded-lg text-white hover:bg-indigo-700'>  {loading ? 'Summarizing...' : 'Summarize'}</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className='text-xl font-semibold mb-5'>Summarized Article</p>
            <div className='w-xl h-auto rounded-lg bg-gray-100 p-5'>
                <p>{summary}</p>
            </div>
    </div>
    </div>
    </>
  )
}
