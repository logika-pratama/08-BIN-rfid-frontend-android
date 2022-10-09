import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SheetDbContext = createContext()

const SheetDbProvider = ({ children }) => {
	const [sheetDb, setSheetDb] = useState([])
	const [loadingSheetDb, setLoadingSheetDb] = useState(false)

	async function loadSheet() {
		setLoadingSheetDb(true)
		try {
			const sheetDataSerialized = await AsyncStorage.getItem('@sheetDb')
			if (sheetDataSerialized) {
				const sheetDataParsed = JSON.parse(sheetDataSerialized)
				setSheetDb(sheetDataParsed)
			}
		} catch (err) {
			console.log('Failed get sheet from async storage', err)
		} finally {
			setLoadingSheetDb(false)
		}
	}

	async function saveSheet(sheetData) {
		setLoadingSheetDb(true)
		try {
			const sheetDataSerialized = JSON.stringify(sheetData)
			setSheetDb(sheetData)
			await AsyncStorage.setItem('@sheetDb', sheetDataSerialized)
		} catch (err) {
			console.error('Failed store sheet to async storage', err)
		} finally {
			setLoadingSheetDb(false)
		}
	}

	return <SheetDbContext.Provider value={{ sheetDb, loadingSheetDb, saveSheet, loadSheet }}>
		{children}
	</SheetDbContext.Provider>
}

const useSheetDb = () => {
	const context = useContext(SheetDbContext)
	if (!context) {
		throw new Error('useSheetDb must be used within an SheetDbProvider');
	}

	return context
}

export { SheetDbProvider, useSheetDb }
