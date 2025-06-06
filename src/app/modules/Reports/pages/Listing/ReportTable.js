import React from 'react';
import { makeStyles } from '@material-ui/core';
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import { formatAmountFromString } from '../../../../utils/formatData';

const useStyles = makeStyles(({
    table: {
        fontSize: '0.5rem',
        borderRadius: '30px'
    },
    td: {
        textAlign: 'center'
    },
    tr:{
        backgroundColor: '#bab5b5'
    },
    tdRed: {
        color: '#ff4944'
    },
    th: {
        backgroundColor: '#e5e0ca'
    },
    headers: {
        backgroundColor: '#2c2259',
        color: '#fff',
        borderTop: '2px solid  #2c2259'
    },
    borderColumn: {
        borderLeft: '2px solid #2c2259'
    },
    pxMarketClean: {
        backgroundColor: '#bcd3d8',
        borderTop: '#bcd3d8!important'
    },
    closedPositions: {
        backgroundColor: '#d5d5e2'
    },
    totalRow: {
        backgroundColor: "#d3d3d3"
    }
}))

const formatData = (value, active) => {
    if(value === 0 && (active === 'POSICIONES CERRADAS' || active === 'SUBTOTAL')){
        return null
    } else {
        return value < 0? `(${formatAmountFromString(value)})`  : formatAmountFromString(value)
    }
}

export const ReportTable = ({data}) => {

    const classes = useStyles()

    return(
        <div className='table-responsive'>
            <table  className={`${classes.table} table table-head-custom table-vertical-center overflow-hidden`}>
                <tr key={1} className={classes.headers}>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Activos (USD)</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Cantidad (VN) </th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">PX Costo Clean</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Monto Clean</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">PX Compra Dirty</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Monto Dirty</th>
                    <th tabindex="0" aria-label="Nombre sortable" className={`sortable text-center ${classes.borderColumn}`}>PX Mercado Clean</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Monto Clean</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">PX Mercado Dirty</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Monto Actual Dirty</th>
                    <th tabindex="0" aria-label="Nombre sortable" className={`sortable text-center ${classes.borderColumn}`}>Unrealized Clean</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Net Carry + Cupones</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Total P&L</th>
                    <th tabindex="0" aria-label="Nombre sortable" className="sortable text-center">Cupon Dividens</th>
                </tr>
                <tr>
                    <th colSpan='6' className={`${classes.td} ${classes.th}`}>INVERTIDO</th>
                    <th colSpan='4' className={`${classes.borderColumn} ${classes.td} ${classes.th}`}>VALUACIÓN ACTUAL</th>
                    <th colSpan='4' className={`${classes.borderColumn} ${classes.td} ${classes.th}`}>P&L</th>
                </tr>
                {
                    data?.map((e)=> {
                        return (
                            <>
                                {
                                    e.header && (
                                        <tr>
                                            <th colSpan='6' className={`${classes.tr}`}>{e?.header}</th>
                                            <th colSpan='4' className={`${classes.borderColumn} ${classes.tr}`}></th>
                                            <th colSpan='4' className={`${classes.borderColumn} ${classes.tr}`}></th>
                                        </tr>
                                    )
                                }
                                {
                                    e?.details?.map((e)=> {
                                        return(
                                            <tr key={e?.Activos} className={`${e?.Activos === 'POSICIONES CERRADAS'? classes.closedPositions : ''}`}>
                                                <td className={`${classes.td}`}>
                                                    {e?.Activos}
                                                </td>
                                                <td className={`${classes.td} ${(e?.Cantidad) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.Cantidad, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXCostoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXCostoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXCompraDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXCompraDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.borderColumn} ${classes.td} ${e?.Activos === 'POSICIONES CERRADAS'? '' : classes.pxMarketClean} ${(e?.PXMercadoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXMercadoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MercadoMontoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MercadoMontoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXMercadoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXMercadoDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoMercadoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoMercadoDirty, e?.Activos)}
                                                </td>
                                                <td className={` ${classes.borderColumn} ${classes.td} ${(e?.UnrealizedClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.UnrealizedClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.NetCarryCupones) >= 0? '' :`${classes.tdRed}`} `}>
                                                    {formatData(e?.NetCarryCupones, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.["TotalP&L"]) >= 0? '' :`${classes.tdRed}`}`}>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                    {formatData(e?.["TotalP&L"], e?.Activos)}
                                                        <span className={`svg-icon svg-icon-b  ${e?.["TotalP&L"] < 0? 'svg-icon-danger': ''}`}>
                                                            <SVG
                                                            className="h-75 align-self-end"
                                                            src={`${e?.["TotalP&L"] < 0? toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-down.svg"): toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-up.svg")}`}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className={`${classes.td} ${(e?.CuponDividens) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.CuponDividens, e?.Activos)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    e?.invested?.map((e)=> {
                                        return(
                                            <tr key={e.Activos} className={`${classes.tr}`}>
                                                <th className={`${classes.td}`}>
                                                    {e?.Activos}
                                                </th>
                                                <td className={`${classes.td} ${(e?.Cantidad) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.Cantidad, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXCostoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXCostoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXCompraDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXCompraDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.borderColumn} ${classes.td} ${e?.Activos === 'MONTO INVERTIDO'? '' : classes.pxMarketClean} ${(e?.PXMercadoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXMercadoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MercadoMontoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MercadoMontoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXMercadoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXMercadoDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoMercadoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoMercadoDirty, e?.Activos)}
                                                </td>
                                                <td className={` ${classes.borderColumn} ${classes.td} ${(e?.UnrealizedClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.UnrealizedClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.NetCarryCupones) >= 0? '' :`${classes.tdRed}`} `}>
                                                    {formatData(e?.NetCarryCupones, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.["TotalP&L"]) >= 0? '' :`${classes.tdRed}`}`}>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                    {formatData(e?.["TotalP&L"], e?.Activos)}
                                                        <span className={`svg-icon svg-icon-b  ${e?.["TotalP&L"] < 0? 'svg-icon-danger': ''}`}>
                                                            <SVG
                                                            className="h-75 align-self-end"
                                                            src={`${e?.["TotalP&L"] < 0? toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-down.svg"): toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-up.svg")}`}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className={`${classes.td} ${(e?.CuponDividens) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.CuponDividens, e?.Activos)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    e?.total?.map((e)=> {
                                        return(
                                            <tr key={e.Activos} className={`${classes.totalRow}`}>
                                                <th className={`${classes.td}`}>
                                                    {e?.Activos}
                                                </th>
                                                <td className={`${classes.td} ${(e?.Cantidad) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.Cantidad, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXCostoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXCostoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXCompraDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXCompraDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.borderColumn} ${classes.td} ${e?.Activos === 'TOTAL (USD)'? '' : classes.pxMarketClean} ${(e?.PXMercadoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXMercadoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MercadoMontoClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MercadoMontoClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.PXMercadoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.PXMercadoDirty, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.MontoMercadoDirty) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.MontoMercadoDirty, e?.Activos)}
                                                </td>
                                                <td className={` ${classes.borderColumn} ${classes.td} ${(e?.UnrealizedClean) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.UnrealizedClean, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.NetCarryCupones) >= 0? '' :`${classes.tdRed}`} `}>
                                                    {formatData(e?.NetCarryCupones, e?.Activos)}
                                                </td>
                                                <td className={`${classes.td} ${(e?.["TotalP&L"]) >= 0? '' :`${classes.tdRed}`}`}>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                    {formatData(e?.["TotalP&L"], e?.Activos)}
                                                        <span className={`svg-icon svg-icon-b  ${e?.["TotalP&L"] < 0? 'svg-icon-danger': ''}`}>
                                                            <SVG
                                                            className="h-75 align-self-end"
                                                            src={`${e?.["TotalP&L"] < 0? toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-down.svg"): toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-up.svg")}`}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className={`${classes.td} ${(e?.CuponDividens) >= 0? '' :`${classes.tdRed}`}`}>
                                                    {formatData(e?.CuponDividens, e?.Activos)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </>
                            
                        )
                    })
                }
            </table>
        </div>
    )
}