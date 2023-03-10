import React from 'react';
import { useSelector } from 'react-redux';

import { Menu } from '../../components/menu';
import { RootState } from '../../redux/redux-store';

import './rules.scss';

export const Rules: React.FC = (): JSX.Element => {
  const isOpenMenu = useSelector((state: RootState) => state.menu.isOpen);

  return (
    <section className='rules-page'>
      {!isOpenMenu && <Menu />}

      <div className='rules-page__content'>
        <span className='rules-page__content_title'>Правила пользования</span>
        <div className='rules-page__content_text rules'>
          <div className='rules__paragraph'>
            <span className='rules__paragraph_title'>
              1. Идейные соображения высшего порядка, а также высокое качество позиционных исследований представляет
              собой интересный эксперимент проверки экспериментов, поражающих по своей масштабности и грандиозности.
            </span>
            <div className='rules__paragraph_text text-block'>
              <span>
                1.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого
                участника как способного принимать собственные решения касаемо инновационных методов управления
                процессами.
              </span>
              <span>
                1.2. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление играет
                важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности внутренней
                политики лишь добавляют фракционных разногласий и преданы социально-демократической анафеме.
              </span>
              <span>
                1.3. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся
                непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
              </span>
              <span>
                1.4. Но независимые государства, которые представляют собой яркий пример континентально-европейского
                типа политической культуры, будут объединены в целые кластеры себе подобных.{' '}
              </span>
            </div>
          </div>
          <div className='rules__paragraph'>
            <span className='rules__paragraph_title'>
              2. С учётом сложившейся международной обстановки, консультация с широким активом предоставляет широкие
              возможности для приоритизации разума над эмоциями.
            </span>
            <div className='rules__paragraph_text text-block'>
              <span>
                2.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого
                участника как способного принимать собственные решения касаемо инновационных методов управления
                процессами.{' '}
              </span>
              <div>
                <span>
                  {' '}
                  2.1.1. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление
                  играет важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности
                  внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической
                  анафеме.
                </span>{' '}
              </div>
              <div>
                <span>
                  {' '}
                  2.1.2. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся
                  непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.
                </span>{' '}
              </div>
              <span>
                2.2. Но независимые государства, которые представляют собой яркий пример континентально-европейского
                типа политической культуры, будут объединены в целые кластеры себе подобных.{' '}
              </span>
            </div>
          </div>
          <div className='rules__paragraph'>
            <span className='rules__paragraph_title'>
              3. Принимая во внимание показатели успешности, укрепление и развитие внутренней структуры требует от нас
              анализа приоритизации разума над эмоциями.
            </span>
            <div className='rules__paragraph_text text-block'>
              <span>
                3.1. Задача организации, в особенности же социально-экономическое развитие однозначно определяет каждого
                участника как способного принимать собственные решения касаемо инновационных методов управления
                процессами.{' '}
              </span>
              <div>
                <span>
                  3.1.1. Не следует, однако, забывать, что разбавленное изрядной долей эмпатии, рациональное мышление
                  играет важную роль в формировании приоритизации разума над эмоциями. Но некоторые особенности
                  внутренней политики лишь добавляют фракционных разногласий и преданы социально-демократической
                  анафеме.{' '}
                </span>
              </div>
              <div>
                <span>
                  3.1.2. Приятно, граждане, наблюдать, как элементы политического процесса, превозмогая сложившуюся
                  непростую экономическую ситуацию, объявлены нарушающими общечеловеческие нормы этики и морали.{' '}
                </span>
              </div>
              <span>
                3.2. Но независимые государства, которые представляют собой яркий пример континентально-европейского
                типа политической культуры, будут объединены в целые кластеры себе подобных.{' '}
              </span>
              <span>
                3.3. Не следует, однако, забывать, что экономическая повестка сегодняшнего дня требует анализа анализа
                существующих паттернов поведения.{' '}
              </span>
              <div>
                <span>
                  3.3.1. А ещё представители современных социальных резервов набирают популярность среди определенных
                  слоев населения, а значит, должны быть функционально разнесены на независимые элементы.{' '}
                </span>

                <div>
                  <span>
                    3.3.1.1. Стремящиеся вытеснить традиционное производство, нанотехнологии могут быть объявлены
                    нарушающими общечеловеческие нормы этики и морали.{' '}
                  </span>
                  <span>
                    3.3.1.2. Прежде всего, разбавленное изрядной долей эмпатии, рациональное мышление однозначно
                    фиксирует необходимость новых предложений. Являясь всего лишь частью общей картины, независимые
                    государства представлены в исключительно положительном свете.
                  </span>
                </div>
              </div>
              <span>
                3.4. Повседневная практика показывает, что убеждённость некоторых оппонентов требует от нас анализа
                распределения внутренних резервов и ресурсов.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
