import React from 'react'
import cn from 'classnames';
import s from './Files.module.css'

const Files  = ({files,teamId,getFile,deleteFile,isDayTheme,isTeacher}) => {

    const getFileHandler = (fileName,e) => {
        e.preventDefault()
        getFile({teamId,fileName})
    }

    const deleteFileHandler = (fileName,e) => {
        e.preventDefault()
        deleteFile({fileName,teamId})
    }

    return (
        <div className={s.filesContainer}>
            {files && files.map(({fileName,filePath,getFileStatus}) => (
                <div
                    key={fileName}
                    className={s.fileWrap}
                >
                    <div className={s.fileIcon}></div>
                    <a
                        target="_blank"
                        href={filePath ? filePath : '#'}
                        className={cn(
                            {[s.fileNameGet]: getFileStatus},
                            {[s.fileName]: !getFileStatus},
                            {[s.fileName__light]: isDayTheme}

                        )}
                    >
                        {fileName}
                    </a>
                    <button
                        className={cn(
                            {[s.fileGetBtnDoes]: getFileStatus },
                            {[s.fileGetBtn]: !getFileStatus },
                            {[s.fileGetBtn__light]: isDayTheme && !getFileStatus},
                            )
                        }
                        onClick={(e) => getFileHandler(fileName,e)}
                    >
                        {getFileStatus ? 'Файл получен' : 'Получить файл'}
                    </button>
                    { isTeacher &&
                        <button
                            className={s.deleteFileBtn}
                            onClick={(e) => deleteFileHandler(fileName, e)}
                        >
                            <svg className={s.deleteFileIcon} height="23px" viewBox="-57 0 512 512" width="23px"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/>
                                <path
                                    d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/>
                                <path
                                    d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/>
                            </svg>
                        </button>
                    }
                </div>
            )
            )}
        </div>

    );
}

export default Files;