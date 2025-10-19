import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignUpScreen() {
    const BASE_URL = 'http://10.10.1.69:8080'; // replace with your backend IPv4

    // --- State ---
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [countryOpen, setCountryOpen] = useState(false);
    const [countryValue, setCountryValue] = useState<number | null>(null);
    const [countries, setCountries] = useState<{ label: string; value: number }[]>([]);

    const [parishOpen, setParishOpen] = useState(false);
    const [parishValue, setParishValue] = useState<number | null>(null);
    const [parishes, setParishes] = useState<{ label: string; value: number }[]>([]);

    const [cityOpen, setCityOpen] = useState(false);
    const [cityValue, setCityValue] = useState<number | null>(null);
    const [cities, setCities] = useState<{ label: string; value: number }[]>([]);

    const [communityOpen, setCommunityOpen] = useState(false);
    const [communityValue, setCommunityValue] = useState<number | null>(null);
    const [communities, setCommunities] = useState<{ label: string; value: number }[]>([]);

    // --- Fetch Countries ---
    useEffect(() => {
        fetch(`${BASE_URL}/countries/`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map((c: any) => ({ label: c.country, value: c.id }));
                setCountries(mapped);
            })
            .catch(err => console.error('Error fetching countries:', err));
    }, []);

    // --- Fetch Parishes ---
    useEffect(() => {
        if (countryValue === null) {
            setParishes([]);
            setParishValue(null);
            return;
        }

        fetch(`${BASE_URL}/parishes/?countryId=${countryValue}`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map((p: any) => ({ label: p.name, value: p.id }));
                setParishes(mapped);
                setParishValue(null);
            })
            .catch(err => console.error('Error fetching parishes:', err));
    }, [countryValue]);

    // --- Fetch Cities ---
    useEffect(() => {
        if (parishValue === null) {
            setCities([]);
            setCityValue(null);
            return;
        }

        fetch(`${BASE_URL}/cities/byParish?parishId=${parishValue}`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map((c: any) => ({ label: c.name, value: c.id }));
                setCities(mapped);
                setCityValue(null);
            })
            .catch(err => console.error('Error fetching cities:', err));
    }, [parishValue]);

    // --- Fetch Communities ---
    useEffect(() => {
        if (cityValue === null) {
            setCommunities([]);
            setCommunityValue(null);
            return;
        }

        fetch(`${BASE_URL}/communities/byCity?cityId=${cityValue}`)
            .then(res => res.json())
            .then(data => {
                const mapped = data.map((c: any) => ({ label: c.name, value: c.id }));
                setCommunities(mapped);
                setCommunityValue(null);
            })
            .catch(err => console.error('Error fetching communities:', err));
    }, [cityValue]);

    // --- Submit ---
    const handleSubmit = () => {
        if (!firstname || !lastname || !username || !password) {
            alert('Please fill all fields.');
            return;
        }

        const payload = {
            firstname,
            lastname,
            username,
            password,
            country: countries.find(c => c.value === countryValue)?.label || '',
            parish: parishes.find(p => p.value === parishValue)?.label || '',
            city: cities.find(c => c.value === cityValue)?.label || '',
            community: communities.find(c => c.value === communityValue)?.label || '',
            comalerts: false,
            panicalerts: false,
            urgentalerts: false,
        };

        fetch(`${BASE_URL}/accounts/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(async res => {
                const text = await res.text(); // in case backend returns text
                if (res.ok) {
                    alert('Account created successfully!');
                    setFirstname('');
                    setLastname('');
                    setUsername('');
                    setPassword('');
                    setCountryValue(null);
                    setParishValue(null);
                    setCityValue(null);
                    setCommunityValue(null);
                } else {
                    console.error('Error creating account:', text);
                    alert('Error creating account. Check console for details.');
                }
            })
            .catch(err => console.error('Error creating account:', err));
    };

    return (
        <FlatList
            contentContainerStyle={styles.container}
            data={[{}]} // just one item to allow FlatList container
            renderItem={() => (
                <View style={styles.innerContainer}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.input} value={firstname} onChangeText={setFirstname} />

                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input} value={lastname} onChangeText={setLastname} />

                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.input} value={username} onChangeText={setUsername} />

                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

                    <Text style={styles.label}>Country</Text>
                    <DropDownPicker
                        open={countryOpen}
                        value={countryValue}
                        items={countries}
                        setOpen={setCountryOpen}
                        setValue={setCountryValue}
                        placeholder="Select country"
                        zIndex={5000}
                        zIndexInverse={1000}
                        style={styles.dropdown}
                        containerStyle={{ marginBottom: 10 }}
                    />

                    <Text style={styles.label}>Parish</Text>
                    <DropDownPicker
                        open={parishOpen}
                        value={parishValue}
                        items={parishes}
                        setOpen={setParishOpen}
                        setValue={setParishValue}
                        placeholder="Select parish"
                        zIndex={4000}
                        zIndexInverse={5000}
                        style={styles.dropdown}
                        dropDownContainerStyle={{ backgroundColor: '#fafafa', maxHeight: 250 }}
                        scrollViewProps={{ nestedScrollEnabled: true }}
                        containerStyle={{ marginBottom: 10 }}
                    />

                    <Text style={styles.label}>City</Text>
                    <DropDownPicker
                        open={cityOpen}
                        value={cityValue}
                        items={cities}
                        setOpen={setCityOpen}
                        setValue={setCityValue}
                        placeholder="Select city"
                        zIndex={3000}
                        zIndexInverse={1000}
                        style={styles.dropdown}
                        containerStyle={{ marginBottom: 10 }}
                    />

                    <Text style={styles.label}>Community</Text>
                    <DropDownPicker
                        open={communityOpen}
                        value={communityValue}
                        items={communities}
                        setOpen={setCommunityOpen}
                        setValue={setCommunityValue}
                        placeholder="Select community"
                        zIndex={2000}
                        zIndexInverse={1000}
                        style={styles.dropdown}
                        dropDownContainerStyle={{ backgroundColor: '#fafafa', maxHeight: 200 }}
                        containerStyle={{ marginBottom: 20 }}
                    />

                    <Button title="Sign Up" onPress={handleSubmit} />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        alignItems: 'center',
        width: '100%',
    },
    label: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
    },
    dropdown: {
        width: '100%',
    },
});
