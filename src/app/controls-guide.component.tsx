import React from "react";

export const ControlsGuide: React.FC = () => (
  <div className="controls-guide">
    <div className="controls-list">
      <h5 className="controls-list__title">Клавиатура</h5>
      <ul className="controls-list__list">
        <li className="controls-list__list-item">r - Запуск / перезапуск игрового цикла</li>
        <li className="controls-list__list-item">s - Остановка игрового цикла</li>
        <li className="controls-list__list-item">p - Пауза</li>
        <li className="controls-list__list-item">o - Продолжить</li>
      </ul>
    </div>

    <div className="controls-list">
      <h5 className="controls-list__title">Мышь</h5>
      <ul className="controls-list__list">
        <li className="controls-list__list-item">
          ЛКМ - Толкнуть шар (случайная величина и направление)
        </li>
        <li className="controls-list__list-item">ПКМ - Выбрать шар для изменения цвета</li>
      </ul>
    </div>
  </div>
);
