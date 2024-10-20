import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query); 
    };

    return (
        <div className='flex gap-2'>
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or ingredients"
            />
            <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search</Button>
        </div>
    );
};

export default SearchBar;
