import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../image/Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "./../../styles/Login.css";
import "./../../styles/Header.css";

const Faq = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [nestedActiveIndex, setNestedActiveIndex] = useState({});
  const [innerNestedActiveIndex, setInnerNestedActiveIndex] = useState({});
  const [deepNestedActiveIndex, setDeepNestedActiveIndex] = useState({});
  const [deepestNestedActiveIndex, setDeepestNestedActiveIndex] = useState({});
  const [finalNestedActiveIndex, setFinalNestedActiveIndex] = useState({});

  const handleLoginMenuClick = () => {
    navigate("/login");
  };

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleNestedAccordionClick = (parentIndex, index) => {
    setNestedActiveIndex((prevState) => ({
      ...prevState,
      [parentIndex]: prevState[parentIndex] === index ? null : index,
    }));
  };

  const handleInnerNestedAccordionClick = (
    outerParentIndex,
    parentIndex,
    index
  ) => {
    setInnerNestedActiveIndex((prevState) => ({
      ...prevState,
      [`${outerParentIndex}-${parentIndex}`]:
        prevState[`${outerParentIndex}-${parentIndex}`] === index
          ? null
          : index,
    }));
  };

  const handleDeepNestedAccordionClick = (
    outermostParentIndex,
    outerParentIndex,
    parentIndex,
    index
  ) => {
    setDeepNestedActiveIndex((prevState) => ({
      ...prevState,
      [`${outermostParentIndex}-${outerParentIndex}-${parentIndex}`]:
        prevState[
          `${outermostParentIndex}-${outerParentIndex}-${parentIndex}`
        ] === index
          ? null
          : index,
    }));
  };

  const handleDeepestNestedAccordionClick = (
    topIndex,
    upperIndex,
    outerIndex,
    innerIndex,
    index
  ) => {
    setDeepestNestedActiveIndex((prevState) => ({
      ...prevState,
      [`${topIndex}-${upperIndex}-${outerIndex}-${innerIndex}`]:
        prevState[`${topIndex}-${upperIndex}-${outerIndex}-${innerIndex}`] ===
        index
          ? null
          : index,
    }));
  };
  const handleFinalNestedAccordionClick = (
    topMostIndex,
    upperIndex,
    outerIndex,
    innerIndex,
    deepestIndex,
    index
  ) => {
    setFinalNestedActiveIndex((prevState) => ({
      ...prevState,
      [`${topMostIndex}-${upperIndex}-${outerIndex}-${innerIndex}-${deepestIndex}`]:
        prevState[
          `${topMostIndex}-${upperIndex}-${outerIndex}-${innerIndex}-${deepestIndex}`
        ] === index
          ? null
          : index,
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      {/* <div className="w-full  text-Black text-center" style={{
                backgroundColor: '#1f4e96', display: 'flex',
                justifyContent: 'space-between', height: '80px'
            }}>
                <div className='text-2xl '>
                    <div className="bannerHeader">
                        <span className="brandingFaqYoko">Y-ChatGPT</span>
                    </div>
                </div>

                <div className='' style={{ marginRight: '20px', marginTop: '17px' }}>
                    <button onClick={handleLoginMenuClick} className='bg-transparent text-white mr-4 mb-2 py-2 px-4' style={{ border: 'none' }}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '20px' }} title="Back" />
                    </button>

                </div>
            </div> */}

      <header
        className="flex items-center justify-between bg-[#1f4e96] h-20 sm:h-24 px-4 sm:px-8"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Left Section (Arrow Button) */}
        <div className="logo flex items-center">
          <button
            onClick={handleLoginMenuClick}
            className="bg-transparent text-white py-2 px-2 sm:px-4 ml-2 sm:ml-6 md:ml-12 lg:ml-6 xl:ml-4"
            style={{ border: "none" }}
          >
            <FontAwesomeIcon
              className="text-lg sm:text-xl md:text-3xl xl:text-4xl 2xl:text-5xl"
              icon={faArrowLeft}
              title="Back"
            />
          </button>

          <div className="ml-[1360px]">
            <span className="text-white font-bold mr-5 text-sm sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
              Y-ChatGPT
            </span>
          </div>
        </div>
      </header>

      {/* <div className="flex-grow">
        <div className="ml-6 mt-5">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-black-800">
              Frequently Asked Questions About Y-ChatGPT
            </p>
            <p className="text-xl">Last updated: June 12, 2024</p>
          </div>
        </div>

        <div
          className="w-full max-w-3xl mx-auto mt-8"
          style={{ maxWidth: "102rem" }}
        >
          {accordionData.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => handleAccordionClick(index)}
                className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
              >
                <h2 className="text-lg font-medium text-gray-900">
                  {item.question}
                </h2>
                <FontAwesomeIcon
                  icon={activeIndex === index ? faChevronUp : faChevronDown}
                  className="text-gray-500"
                />
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-2 text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  {item.nestedQuestions && (
                    <div className="ml-4 mt-4">
                      {item.nestedQuestions.map((nestedItem, nestedIndex) => (
                        <div
                          key={nestedIndex}
                          className="border-b border-gray-200"
                        >
                          <button
                            onClick={() =>
                              handleNestedAccordionClick(index, nestedIndex)
                            }
                            className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                          >
                            <h3 className="text-lg font-medium text-gray-700">
                              {nestedItem.question}
                            </h3>
                            <FontAwesomeIcon
                              icon={
                                nestedActiveIndex[index] === nestedIndex
                                  ? faChevronUp
                                  : faChevronDown
                              }
                              className="text-gray-500"
                            />
                          </button>
                          {nestedActiveIndex[index] === nestedIndex && (
                            <div className="px-4 pb-2 text-gray-700">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: nestedItem.answer,
                                }}
                              />
                              {nestedItem.innerNestedQuestions && (
                                <div className="ml-4 mt-4">
                                  {nestedItem.innerNestedQuestions.map(
                                    (innerNestedItem, innerNestedIndex) => (
                                      <div
                                        key={innerNestedIndex}
                                        className="border-b border-gray-200"
                                      >
                                        <button
                                          onClick={() =>
                                            handleInnerNestedAccordionClick(
                                              index,
                                              nestedIndex,
                                              innerNestedIndex
                                            )
                                          }
                                          className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                        >
                                          <h4 className="text-lg font-medium text-gray-600">
                                            {innerNestedItem.question}
                                          </h4>
                                          <FontAwesomeIcon
                                            icon={
                                              innerNestedActiveIndex[
                                                `${index}-${nestedIndex}`
                                              ] === innerNestedIndex
                                                ? faChevronUp
                                                : faChevronDown
                                            }
                                            className="text-gray-500"
                                          />
                                        </button>
                                        {innerNestedActiveIndex[
                                          `${index}-${nestedIndex}`
                                        ] === innerNestedIndex && (
                                          <div className="px-4 pb-2 text-gray-700">
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: innerNestedItem.answer,
                                              }}
                                            />
                                            {innerNestedItem.deepNestedQuestions && (
                                              <div className="ml-4 mt-4">
                                                {innerNestedItem.deepNestedQuestions.map(
                                                  (
                                                    deepNestedItem,
                                                    deepNestedIndex
                                                  ) => (
                                                    <div
                                                      key={deepNestedIndex}
                                                      className="border-b border-gray-200"
                                                    >
                                                      <button
                                                        onClick={() =>
                                                          handleDeepNestedAccordionClick(
                                                            index,
                                                            nestedIndex,
                                                            innerNestedIndex,
                                                            deepNestedIndex
                                                          )
                                                        }
                                                        className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                                      >
                                                        <h4 className="text-lg font-medium text-gray-600">
                                                          {
                                                            deepNestedItem.question
                                                          }
                                                        </h4>
                                                        <FontAwesomeIcon
                                                          icon={
                                                            deepNestedActiveIndex[
                                                              `${index}-${nestedIndex}-${innerNestedIndex}`
                                                            ] ===
                                                            deepNestedIndex
                                                              ? faChevronUp
                                                              : faChevronDown
                                                          }
                                                          className="text-gray-500"
                                                        />
                                                      </button>
                                                      {deepNestedActiveIndex[
                                                        `${index}-${nestedIndex}-${innerNestedIndex}`
                                                      ] === deepNestedIndex && (
                                                        <div className="px-4 pb-2 text-gray-700">
                                                          <div
                                                            dangerouslySetInnerHTML={{
                                                              __html:
                                                                deepNestedItem.answer,
                                                            }}
                                                          />
                                                          {deepNestedItem.deepestNestedQuestions && (
                                                            <div className="ml-4 mt-4">
                                                              {deepNestedItem.deepestNestedQuestions.map(
                                                                (
                                                                  deepestNestedItem,
                                                                  deepestNestedIndex
                                                                ) => (
                                                                  <div
                                                                    key={
                                                                      deepestNestedIndex
                                                                    }
                                                                    className="border-b border-gray-200"
                                                                  >
                                                                    <button
                                                                      onClick={() =>
                                                                        handleDeepestNestedAccordionClick(
                                                                          index,
                                                                          nestedIndex,
                                                                          innerNestedIndex,
                                                                          deepNestedIndex,
                                                                          deepestNestedIndex
                                                                        )
                                                                      }
                                                                      className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                                                    >
                                                                      <h4 className="text-lg font-medium text-gray-600">
                                                                        {
                                                                          deepestNestedItem.question
                                                                        }
                                                                      </h4>
                                                                      <FontAwesomeIcon
                                                                        icon={
                                                                          deepestNestedActiveIndex[
                                                                            `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}`
                                                                          ] ===
                                                                          deepestNestedIndex
                                                                            ? faChevronUp
                                                                            : faChevronDown
                                                                        }
                                                                        className="text-gray-500"
                                                                      />
                                                                    </button>
                                                                    {deepestNestedActiveIndex[
                                                                      `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}`
                                                                    ] ===
                                                                      deepestNestedIndex && (
                                                                      <div className="px-4 pb-2 text-gray-700">
                                                                        <div
                                                                          dangerouslySetInnerHTML={{
                                                                            __html:
                                                                              deepestNestedItem.answer,
                                                                          }}
                                                                        />
                                                                        {deepestNestedItem.finalNestedQuestions && (
                                                                          <div className="ml-4 mt-4">
                                                                            {deepestNestedItem.finalNestedQuestions.map(
                                                                              (
                                                                                finalNestedItem,
                                                                                finalNestedIndex
                                                                              ) => (
                                                                                <div
                                                                                  key={
                                                                                    finalNestedIndex
                                                                                  }
                                                                                  className="border-b border-gray-200"
                                                                                >
                                                                                  <button
                                                                                    onClick={() =>
                                                                                      handleFinalNestedAccordionClick(
                                                                                        index,
                                                                                        nestedIndex,
                                                                                        innerNestedIndex,
                                                                                        deepNestedIndex,
                                                                                        deepestNestedIndex,
                                                                                        finalNestedIndex
                                                                                      )
                                                                                    }
                                                                                    className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                                                                  >
                                                                                    <h4 className="text-lg font-medium text-gray-600">
                                                                                      {
                                                                                        finalNestedItem.question
                                                                                      }
                                                                                    </h4>
                                                                                    <FontAwesomeIcon
                                                                                      icon={
                                                                                        finalNestedActiveIndex[
                                                                                          `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}-${deepestNestedIndex}`
                                                                                        ] ===
                                                                                        finalNestedIndex
                                                                                          ? faChevronUp
                                                                                          : faChevronDown
                                                                                      }
                                                                                      className="text-gray-500"
                                                                                    />
                                                                                  </button>
                                                                                  {finalNestedActiveIndex[
                                                                                    `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}-${deepestNestedIndex}`
                                                                                  ] ===
                                                                                    finalNestedIndex && (
                                                                                    <div className="px-4 pb-2 text-gray-700">
                                                                                      <div
                                                                                        dangerouslySetInnerHTML={{
                                                                                          __html:
                                                                                            finalNestedItem.answer,
                                                                                        }}
                                                                                      />
                                                                                    </div>
                                                                                  )}
                                                                                </div>
                                                                              )
                                                                            )}
                                                                          </div>
                                                                        )}
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                )
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}

      {/* Body */}
      <div className="bg-main-background rounded-xl ml-14 mr-10 mt-14 flex-grow">
        <div className="ml-8 mt-5">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-black-800">
              Frequently Asked Questions About Y-ChatGPT
            </p>
            <p className="text-xl mr-6">Last updated: June 12, 2024</p>
          </div>
        </div>
        <div
          className="w-full max-w-3xl mx-auto mt-8"
          style={{ maxWidth: "102rem" }}
        >
          {accordionData.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => handleAccordionClick(index)}
                className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
              >
                <h2 className="text-lg font-medium text-gray-900">
                  {item.question}
                </h2>
                <FontAwesomeIcon
                  icon={activeIndex === index ? faChevronUp : faChevronDown}
                  className="text-gray-500"
                />
              </button>
              {activeIndex === index && (
                <div className="px-4 pb-2 text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                  {item.nestedQuestions && (
                    <div className="ml-4 mt-4">
                      {item.nestedQuestions.map((nestedItem, nestedIndex) => (
                        <div
                          key={nestedIndex}
                          className="border-b border-gray-200"
                        >
                          <button
                            onClick={() =>
                              handleNestedAccordionClick(index, nestedIndex)
                            }
                            className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                          >
                            <h3 className="text-lg font-medium text-gray-700">
                              {nestedItem.question}
                            </h3>
                            <FontAwesomeIcon
                              icon={
                                nestedActiveIndex[index] === nestedIndex
                                  ? faChevronUp
                                  : faChevronDown
                              }
                              className="text-gray-500"
                            />
                          </button>
                          {nestedActiveIndex[index] === nestedIndex && (
                            <div className="px-4 pb-2 text-gray-700">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: nestedItem.answer,
                                }}
                              />
                              {nestedItem.innerNestedQuestions && (
                                <div className="ml-4 mt-4">
                                  {nestedItem.innerNestedQuestions.map(
                                    (innerNestedItem, innerNestedIndex) => (
                                      <div
                                        key={innerNestedIndex}
                                        className="border-b border-gray-200"
                                      >
                                        <button
                                          onClick={() =>
                                            handleInnerNestedAccordionClick(
                                              index,
                                              nestedIndex,
                                              innerNestedIndex
                                            )
                                          }
                                          className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                        >
                                          <h4 className="text-lg font-medium text-gray-600">
                                            {innerNestedItem.question}
                                          </h4>
                                          <FontAwesomeIcon
                                            icon={
                                              innerNestedActiveIndex[
                                                `${index}-${nestedIndex}`
                                              ] === innerNestedIndex
                                                ? faChevronUp
                                                : faChevronDown
                                            }
                                            className="text-gray-500"
                                          />
                                        </button>
                                        {innerNestedActiveIndex[
                                          `${index}-${nestedIndex}`
                                        ] === innerNestedIndex && (
                                          <div className="px-4 pb-2 text-gray-700">
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: innerNestedItem.answer,
                                              }}
                                            />
                                            {innerNestedItem.deepNestedQuestions && (
                                              <div className="ml-4 mt-4">
                                                {innerNestedItem.deepNestedQuestions.map(
                                                  (
                                                    deepNestedItem,
                                                    deepNestedIndex
                                                  ) => (
                                                    <div
                                                      key={deepNestedIndex}
                                                      className="border-b border-gray-200"
                                                    >
                                                      <button
                                                        onClick={() =>
                                                          handleDeepNestedAccordionClick(
                                                            index,
                                                            nestedIndex,
                                                            innerNestedIndex,
                                                            deepNestedIndex
                                                          )
                                                        }
                                                        className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                                      >
                                                        <h4 className="text-lg font-medium text-gray-600">
                                                          {
                                                            deepNestedItem.question
                                                          }
                                                        </h4>
                                                        <FontAwesomeIcon
                                                          icon={
                                                            deepNestedActiveIndex[
                                                              `${index}-${nestedIndex}-${innerNestedIndex}`
                                                            ] ===
                                                            deepNestedIndex
                                                              ? faChevronUp
                                                              : faChevronDown
                                                          }
                                                          className="text-gray-500"
                                                        />
                                                      </button>
                                                      {deepNestedActiveIndex[
                                                        `${index}-${nestedIndex}-${innerNestedIndex}`
                                                      ] === deepNestedIndex && (
                                                        <div className="px-4 pb-2 text-gray-700">
                                                          <div
                                                            dangerouslySetInnerHTML={{
                                                              __html:
                                                                deepNestedItem.answer,
                                                            }}
                                                          />
                                                          {deepNestedItem.deepestNestedQuestions && (
                                                            <div className="ml-4 mt-4">
                                                              {deepNestedItem.deepestNestedQuestions.map(
                                                                (
                                                                  deepestNestedItem,
                                                                  deepestNestedIndex
                                                                ) => (
                                                                  <div
                                                                    key={
                                                                      deepestNestedIndex
                                                                    }
                                                                    className="border-b border-gray-200"
                                                                  >
                                                                    <button
                                                                      onClick={() =>
                                                                        handleDeepestNestedAccordionClick(
                                                                          index,
                                                                          nestedIndex,
                                                                          innerNestedIndex,
                                                                          deepNestedIndex,
                                                                          deepestNestedIndex
                                                                        )
                                                                      }
                                                                      className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                                                    >
                                                                      <h4 className="text-lg font-medium text-gray-600">
                                                                        {
                                                                          deepestNestedItem.question
                                                                        }
                                                                      </h4>
                                                                      <FontAwesomeIcon
                                                                        icon={
                                                                          deepestNestedActiveIndex[
                                                                            `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}`
                                                                          ] ===
                                                                          deepestNestedIndex
                                                                            ? faChevronUp
                                                                            : faChevronDown
                                                                        }
                                                                        className="text-gray-500"
                                                                      />
                                                                    </button>
                                                                    {deepestNestedActiveIndex[
                                                                      `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}`
                                                                    ] ===
                                                                      deepestNestedIndex && (
                                                                      <div className="px-4 pb-2 text-gray-700">
                                                                        <div
                                                                          dangerouslySetInnerHTML={{
                                                                            __html:
                                                                              deepestNestedItem.answer,
                                                                          }}
                                                                        />
                                                                        {deepestNestedItem.finalNestedQuestions && (
                                                                          <div className="ml-4 mt-4">
                                                                            {deepestNestedItem.finalNestedQuestions.map(
                                                                              (
                                                                                finalNestedItem,
                                                                                finalNestedIndex
                                                                              ) => (
                                                                                <div
                                                                                  key={
                                                                                    finalNestedIndex
                                                                                  }
                                                                                  className="border-b border-gray-200"
                                                                                >
                                                                                  <button
                                                                                    onClick={() =>
                                                                                      handleFinalNestedAccordionClick(
                                                                                        index,
                                                                                        nestedIndex,
                                                                                        innerNestedIndex,
                                                                                        deepNestedIndex,
                                                                                        deepestNestedIndex,
                                                                                        finalNestedIndex
                                                                                      )
                                                                                    }
                                                                                    className="w-full text-left px-4 py-2 focus:outline-none flex justify-between items-center"
                                                                                  >
                                                                                    <h4 className="text-lg font-medium text-gray-600">
                                                                                      {
                                                                                        finalNestedItem.question
                                                                                      }
                                                                                    </h4>
                                                                                    <FontAwesomeIcon
                                                                                      icon={
                                                                                        finalNestedActiveIndex[
                                                                                          `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}-${deepestNestedIndex}`
                                                                                        ] ===
                                                                                        finalNestedIndex
                                                                                          ? faChevronUp
                                                                                          : faChevronDown
                                                                                      }
                                                                                      className="text-gray-500"
                                                                                    />
                                                                                  </button>
                                                                                  {finalNestedActiveIndex[
                                                                                    `${index}-${nestedIndex}-${innerNestedIndex}-${deepNestedIndex}-${deepestNestedIndex}`
                                                                                  ] ===
                                                                                    finalNestedIndex && (
                                                                                    <div className="px-4 pb-2 text-gray-700">
                                                                                      <div
                                                                                        dangerouslySetInnerHTML={{
                                                                                          __html:
                                                                                            finalNestedItem.answer,
                                                                                        }}
                                                                                      />
                                                                                    </div>
                                                                                  )}
                                                                                </div>
                                                                              )
                                                                            )}
                                                                          </div>
                                                                        )}
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                )
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const accordionData = [
  {
    question: "1. How to Login to Y-ChatGPT?",
    answer:
      "Your Yokogawa email address is required to login to the Y-ChatGPT.",
  },
  {
    question: "2. Brief on flow of the Y-ChatGPT.",
    answer: `<b> Step 1:</b> After successful login, you will be asked to choose the language you want to converse in (Japanese/English).
                <br /><b> Step 2:</b> 4 icons will be displayed (internal/web/intranet/assist bot) and select the appropriate icon based on your question.
                <br /><b> Step3:</b> After your question has been answered, a follow up pops up where you can continue to ask question under the same domain (internal/web/assist bot/intranet) by choosing “yes”.
                <br /><b> Step 4:</b> To stop the conversation, select “no” from the pop up. It will then ask you for your feedback. If interested, you can click on “yes” and give suggestions for improvement or select “no” if you are not interested.
                <br /><b> Step 5:</b> Feedback completion (whether yes/no) brings you to the start of the conversation where all 4 icons are displayed, and you can continue to use them as you wish.`,
  },
  {
    question: "3. Brief use of each icon.",
    answer: `<b> <u>  Internal </u></b> – Its QnA system, we have streamlined a few of the Yokogawa documents related to the policies, processes, Yokogawa product and services etc.
        <br /> <br />

        <b> <u> Web </u></b> – It Is like the Microsoft Bing search; it will provide much more concise answers with reference links.
        <br /><br />

        <b> <u>Assis Bot</u> </b>– It has 2 feature “Helpdesk” and “Other Assistance”
        <br /><br />
        What help does <b> “Helpdesk” </b> provide?
        <br />
        All ServiceNow related queries based on L0 support provide instant answers, helping users troubleshoot issues or find information without having to create a new ticket. This includes getting general guidance for the issues based on region specific. If issue is still not resolved, chatbot will help to raise a ticket/incident if needed and to check their status.
        <br /><br />
        What is <b>“Other Assistance” </b>?
        <br />
        It’s a Real-time coding assistance that improves code quality by offering suggestions. It accelerates the identification and resolution of issues, content generation. Developers can swiftly find solutions to common queries, minimizing downtime during troubleshooting.
        <br /><br />
        <b> <u> Intranet </u> </b>– It helps to fill Timesheet, Mark Attendance, and Apply for leave only for YIL Region.`,
  },
  {
    question: "4. Feature Wise",
    answer:
      " Search Oriented Functionalities and Action Oriented Functionalities ",
    nestedQuestions: [
      {
        question: "4.1.Search Oriented Functionalities",
        answer: "Internal and Web",
        innerNestedQuestions: [
          {
            question: "4.1.1 Internal",
            answer:
              "The Internal Chatbot is a virtual assistant designed to help you quickly find information about the organization, access documents, and provide support through a chat interface.",
            deepNestedQuestions: [
              {
                question: "4.1.1.1 How to navigate Internal ?",
                answer: `<b> Step 1:</b> Navigate to <b>Y-ChatGPT (y-chatbotgpt.azurewebsites.net) </b>
                                <br/><b> Step 2:</b>Click on Enter button (on UI there is Enter button).
                                <br/><b> Step 3:</b>Check both the check box.
                                <br/><b> Step 4:</b>Login with your organization email id & password.
                                <br/><b> Step 5:</b>Click on <b>Search oriented functionality</b>.
                                <br/><b> Step 6:</b>Click on <b>Internal</b>.  `,
              },
              {
                question: "4.1.1.2 How user use the Internal ? ",
                answer:
                  "Simply open the chat interface on your internal portal or application and select language Japanese/English or type your question.",
              },
              {
                question:
                  "4.1.1.3 What kind of information can the chatbot provide ?",
                answer: ` The chatbot can help you with:
                                <br/><b>1.</b> Organizational structure and contact information.
                                <br/><b>2.</b>  Company policies and procedures.
                                <br/><b>3.</b> Frequently asked questions about HR, IT, and other departments.
                                <br/><b>4.</b> Accessing and retrieving internal documents.
                                <br/><b>5.</b> General inquiries about the company.  `,
              },
              {
                question:
                  "4.1.1.4 Can the chatbot help me find specific documents ?",
                answer:
                  "Yes, you can ask the chatbot to locate specific documents. Provide as much detail as possible about the document, such as the title, type, or relevant keywords, to help the chatbot find it quickly. ",
              },
              {
                question:
                  "4.1.1.5 Is my conversation with the chatbot confidential ?",
                answer:
                  "Yes, all interactions with the chatbot are confidential and secure. The system is designed to protect your privacy and the confidentiality of company information.",
              },
              {
                question:
                  "4.1.1.6 How can user provide feedback about the chatbot ?",
                answer:
                  "Your feedback is valuable for us. User can provide feedback directly in the chat interface.",
              },
              {
                question:
                  "4.1.1.7 What support is available if a user encounter issues with Customer asset & security information ?",
                answer:
                  "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.",
              },
            ],
          },
          {
            question: "4.1.2 Web",
            answer:
              "The web is an interactive assistant that helps users to search for content on the internet. It supports both Japanese and English languages, allowing you to ask questions and get information in your preferred language.",

            deepNestedQuestions: [
              {
                question: "4.1.2.1 How to navigate Web ?",
                answer: `<b> Step 1:</b> Navigate to <b>Y-ChatGPT (y-chatbotgpt.azurewebsites.net) </b>
                                <br/><b> Step 2:</b>Click on Enter button (on UI there is Enter button).
                                <br/><b> Step 3:</b>Check both the check box.
                                <br/><b> Step 4:</b>Login with your organization email id & password.
                                <br/><b> Step 5:</b>Click on <b>Search oriented functionality</b>.
                                <br/><b> Step 6:</b>Click on <b>Web</b>. `,
              },
              {
                question: "4.1.2.2 How user use the Web ? ",
                answer:
                  "To use the web chatbot, simply Select your language & type your question or keyword into the chat box and press Enter. The chatbot will search the internet and provide you with relevant information. ",
              },
              {
                question:
                  "4.1.2.3 What kind of information can a user search for ? ",
                answer:
                  "You can search for a wide range of information including news, definitions, explanations, and general web content. If you have a specific topic in mind, just ask.  ",
              },
              {
                question:
                  "4.1.2.4 Is there a limit to the number of questions user can ask ?  ",
                answer:
                  "There is no limit to the number of questions you can ask. Feel free to use the chatbot as much as you need. ",
              },
              {
                question:
                  "4.1.2.5 Can the chatbot understand complex queries ?  ",
                answer:
                  "The chatbot is designed to understand and process a variety of queries. However, for the best results, try to phrase your questions clearly and concisely.  ",
              },
              {
                question: "4.1.2.6 How accurate are the search results ? ",
                answer:
                  " The chatbot retrieves information from the internet, so the accuracy of the results depends on the quality of the sources available online. It aims to provide the most relevant and reliable information.  ",
              },
              {
                question:
                  "4.1.2.7 What should user do if the chatbot does not understand my question ? ",
                answer:
                  "If the chatbot does not understand your question, try rephrasing it. Make sure to use clear and simple language. If the issue persists, check if you are using the supported languages (Japanese or English).  ",
              },
              {
                question:
                  "4.1.2.8 What support is available if a user encounter issues with Customer asset & security information ? ",
                answer:
                  "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.",
              },
            ],
          },
        ],
      },
      {
        question: "4.2. Action Oriented Functionalities",
        answer: "Intranet,Assist Bot and Advance Features",
        innerNestedQuestions: [
          {
            question: "4.2.1 Intranet",
            answer:
              "The intranet chatbot can assist you with applying for leave, submitting Work from Home (WFH) or Work From Office (WFO) requests, and submitting your timesheets. ",

            deepNestedQuestions: [
              {
                question: "4.2.1.1 How to navigate Intranet ?",
                answer: `<b> Step 1:</b> Navigate to <b>Y-ChatGPT (y-chatbotgpt.azurewebsites.net) </b>
                                <br/><b> Step 2:</b>Click on Enter button (on UI there is Enter button).
                                <br/><b> Step 3:</b>Check both the check box.
                                <br/><b> Step 4:</b>Login with your organization email id & password.
                                <br/><b> Step 5:</b>Click on <b>Action oriented functionality</b>.
                                <br/><b> Step 6:</b>Click on <b>Intranet</b>. `,
              },
              {
                question: "4.2.1.2 How user use the Intranet ?",
                answer: `<b> Step 1:</b> Select language Japanese/English.
                                <br/> <b> Step 2:</b> Select domain that you need an assistance <b>Leave, WFH/WFO, Timesheet</b> 
                                <br/><b> Step 3:</b> Bot will guide you through the process by asking for details & forms.  `,
              },
              {
                question:
                  "4.2.1.3 What support is available if a user encounter issues with Customer asset & security information? ",
                answer:
                  "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
              },
            ],
          },
          {
            question: "4.2.2 Assist Bot",
            answer:
              "Assist Bot is a solution for raising IT tickets and seeking assistance for various technical issues. This guide will help you navigate the functionalities of Assist Bot to ensure your concerns are addressed efficiently. ",
            deepNestedQuestions: [
              {
                question: "4.2.2.1 How to navigate Assist Bot ?",
                answer: `<b> Step 1:</b> Navigate to <b>Y-ChatGPT (y-chatbotgpt.azurewebsites.net) </b>
                                <br/><b> Step 2:</b>Click on Enter button (on UI there is Enter button).
                                <br/><b> Step 3:</b>Check both the check box.
                                <br/><b> Step 4:</b>Login with your organization email id & password.
                                <br/><b> Step 5:</b>Click on <b>Action oriented functionality</b>.
                                <br/><b> Step 6:</b>Click on <b>Assist Bot</b>. `,
              },
              {
                question: "4.2.2.2 How user use the Assist bot ?",
                answer: `<b> Step 1:</b> Select the language you would like the bot to assist. (Japanese/English) 
                                <br/><b> Step 2:</b>Select what assistance you need (Help Desk/Other Assistance) 
                                <br/><b> Step 3:</b>Help Desk for Laptop, Software, and VPN Issues. 
                                <br/><b> Step 4:</b>Other Assistance for Code Debugging, Troubleshooting Assistance or in general some arithmetical calculation. 
                                <br/><b> Step 5:</b>Bot will guide you through the process by asking for details & forms.   `,
              },
              {
                question:
                  "4.2.2.3 How can users provide feedback about the chatbot ? ",
                answer:
                  "Your feedback is valuable for us. Users can provide feedback directly in the chat interface. ",
              },
              {
                question:
                  "4.2.2.4 What support is available if a user encounter issues with Customer asset & security information ?  ",
                answer:
                  "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.  ",
              },
            ],
          },
          {
            question: "4.2.3 Advance Features",
            answer:
              "Translation Services/ Document Development,Data Insight Services,RPA Services,Support Services,Security Services,Image/ Video Recognition Services,Code Development Services/ Assistance,Contract Management Services,Gen DCS AI",

            deepNestedQuestions: [
              {
                question: "4.2.3.1 Translation Services/ Document Development",
                answer:
                  "Translate your docs,Translate your text,Email Generator",

                deepestNestedQuestions: [
                  {
                    question: "4.2.3.1.1 Translate your docs",
                    answer:
                      "Translate your Docs is a functionality that allows users to translate their document into any language without changing format and layout.",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.1.1.1 How to navigate Translate your docs? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Translate your Docs  `,
                      },
                      {
                        question:
                          "4.2.3.1.1.2 How to use Translate Your Docs ? ",
                        answer: `<b> Step 1:</b> Click on Browse files 
                                                <br/><b> Step 2:</b>Select file  
                                                <br/><b> Step 3:</b>Click on open 
                                                <br/><b> Step 4:</b>Select language form Choose the target language dropdown.
                                                <br/><b> Step 4:</b>Click on Translate button
                                                <br/><b> Step 4:</b>After translating click on here button 
                                                
                                                `,
                      },
                      {
                        question:
                          "4.2.3.1.1.3 Which languages are supported ? ",
                        answer:
                          "This functionality supports, English, Mandarian Chinese, Spanish, French, Finnish, Standard Arabic, Hindi, Russian, Indonesian, German, Japanese, Swahili, Turkish, Korean, Italian, Dutch, Vietnamese, Thai, Malay, Filpino languages. ",
                      },
                      {
                        question:
                          "4.2.3.1.1.4 Which types of documents can be translated ?  ",
                        answer:
                          "This feature supports a wide range of document types. PDF, DOCX, TXT, PPTX, CSV, XLSX ",
                      },
                      {
                        question:
                          "4.2.3.1.1.5 Will the translated document maintain the same quality as the original ?  ",
                        answer:
                          "Yes, the translated document will maintain the same quality, including fonts, images, tables, and other elements. The primary goal is to ensure that the translated document looks as professional and polished as the original.  ",
                      },
                      {
                        question:
                          "4.2.3.1.1.6 How long does it take to translate a document ? ",
                        answer:
                          "The translation time varies depending on the document's size and complexity. Small documents can be translated in a matter of seconds, while larger and more complex documents may take a few minutes.  ",
                      },
                      {
                        question:
                          "4.2.3.1.1.7 Can I translate a document into multiple languages simultaneously ?  ",
                        answer:
                          "No Translate your Docs allow you to translate document into one language at a time. If you need the document in multiple languages, you will need to repeat the translation process for each target language. ",
                      },
                      {
                        question:
                          "4.2.3.1.1.8 What support is available if user encounter issues with Customer asset & security information ?  ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                  {
                    question: "4.2.3.1.2 Translate your text",
                    answer:
                      "Translate your text is a functionality that allows user to translate your text into wide variety of language quickly and accurately. ",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.1.2.1 How to navigate Translate your Text ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Translate your text  `,
                      },
                      {
                        question:
                          "4.2.3.1.2.2 How to use Translate your Text ?",
                        answer: `<b> Step 1:</b> Select destination language   
                                                <br/><b> Step 2:</b>Enter text to Translate in text box 
                                                <br/><b> Step 3:</b>Click CTRL+Enter `,
                      },
                      {
                        question:
                          "4.2.3.1.2.3 Which languages are supported ?  ",
                        answer:
                          "This functionality supports, English, Mandarian Chinese, Spanish, French, Finnish, Standard Arabic, Hindi, Russian, Indonesian, German, Japanese, Swahili, Turkish, Korean, Italian, Dutch, Vietnamese, Thai, Malay, Filpino languages. ",
                      },
                      {
                        question: "4.2.3.1.2.4 Is this translation instant ?  ",
                        answer:
                          "Yes, most translations are processed almost instantly. The time taken may vary slightly depending on the length of the text and the language pair selected. ",
                      },
                      {
                        question:
                          "4.2.3.1.2.5 How accurate are the translations ?  ",
                        answer:
                          "We use advanced AI-powered translation technology to provide highly accurate translations.  ",
                      },
                      {
                        question:
                          "4.2.3.1.2.6 Is there a limit on the number of characters I can translate at once ?  ",
                        answer: "Yes, it will accept till 5000 characters.",
                      },
                      {
                        question:
                          "4.2.3.1.2.7 Can we translate text from images or PDF files ?  ",
                        answer:
                          " Currently, the functionality supports text-based translations. ",
                      },
                      {
                        question:
                          "4.2.3.1.2.8 What support is available if user encounter issues with Customer asset & security information ?   ",
                        answer:
                          " If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.  ",
                      },
                    ],
                  },
                  {
                    question: "4.2.3.1.3 Email Generator",
                    answer:
                      "The Email Generator is a tool designed to help you quickly and efficiently create emails on any subject or prompt. It allows you to choose the tone based on your recipient's role (superior, teammate, or junior) and supports multiple languages, enabling you to generate emails in several languages at once.  ",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.1.3.1 How to navigate Email Generator ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Email Generator  `,
                      },
                      {
                        question:
                          "4.2.3.1.3.2 How user use the Email generator ?  ",
                        answer: `<b> Step 1:</b> Enter your email prompt. 
                                                <br/><b> Step 2:</b>Select mode (To superior, To teammate, To Junior) 
                                                <br/><b> Step 3:</b>Select Target Language   
                                                <br/><b> Step 4:</b>Click on Generate Email  `,
                      },
                      {
                        question:
                          "4.2.3.1.3.3 What tones are available for different recipients’ roles ?   ",
                        answer: `<b> Step 1:</b> To Superior -Formal and respectful tone, focusing on professionalism and deference.  
                                                <br/><b> Step 2:</b>To Teammate -Collaborative and friendly tone, emphasizing cooperation and equal standing. 
                                                <br/><b> Step 3:</b>To Junior -Supportive and guiding tone, providing clear instructions and encouragement.   `,
                      },
                      {
                        question:
                          "4.2.3.1.3.4 Can user be able generate emails in multiple languages simultaneously ?  ",
                        answer: `Yes, User can. Simply select the languages you need from the list provided before clicking "Generate." The tool will create versions of the email in all selected languages. `,
                      },
                      {
                        question:
                          "4.2.3.1.3.5 What languages are supported ?    ",
                        answer:
                          "The tool supports a wide range of languages like English, Mandarian Chinese, Spanish, French, Finnish, Standard Arabic, Hindi, Russian, Portuguese, Indonesian, German, Japnese, Swahili, Turkish, Korean, Italian, Dutch, Persian (Farsi), Vietnamese, Thai Malay, Filipino. ",
                      },
                      {
                        question:
                          "4.2.3.1.3.6 Can user customize the generated email further ?    ",
                        answer:
                          "Yes, after generating the email, you can edit and customize it to better fit your requirements. The initial generation provides a strong foundation, but you may add personal touches or adjust specific details as needed. ",
                      },
                      {
                        question:
                          "4.2.3.1.3.7 What support is available if user encounter issues with Customer asset & security information ?   ",
                        answer:
                          " If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.  ",
                      },
                    ],
                  },
                ],
              },
              {
                question: "4.2.3.2 Data Insight Services",
                answer: "Chat with you data,Excel Analyzer,PDF Query System",
                deepestNestedQuestions: [
                  {
                    question: "4.2.3.2.1 Chat with you data",
                    answer:
                      "Chat with data is Functionality that allows user to upload documents in various formats (e.g.) And we can ask quest to AI i.e. yChatgpt.",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.2.1.1 How to navigate chat with your data ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Chat with your data `,
                      },
                      {
                        question:
                          "4.2.3.2.1.2 How user use the  Chat with your data ? ",
                        answer: `<b> Step 1:</b> Upload your file (PDF, DOCX, TXT, PNG, JPG, JPEG) 
                                                <br/><b> Step 2:</b>Ask your questions text box will get enable user can start asking questions regarding document       
                                                `,
                      },
                      {
                        question:
                          "4.2.3.2.1.3 How does Chat with your data work ?  ",
                        answer:
                          "Users can upload their documents through the interface provided and then by asking questions related to the content of the documents.",
                      },
                      {
                        question:
                          "4.2.3.2.1.4 What types of documents can I upload ?   ",
                        answer:
                          "Users can upload documents in various formats, including PDF/DOCX/TXT/JPG/PNG/JPEG documents. ",
                      },
                      {
                        question:
                          "4.2.3.2.1.5 What types of questions can I ask about any data ?    ",
                        answer:
                          "You can ask a wide range of questions such as summaries or insights from data and key points.  ",
                      },
                      {
                        question:
                          "4.2.3.2.1.6 Can chat with your data analyze data form different sources and different formats ?     ",
                        answer:
                          "Yes, it is designed to understand and analyze data from different sources and formats. ",
                      },
                      {
                        question:
                          "4.2.3.2.1.7 How accurate is the data provided by Chat with your data ?      ",
                        answer:
                          "The accuracy of Chat with data depends on the various factors quality, completeness of the data/document and complexity of questions to be asked.  ",
                      },
                      {
                        question:
                          "4.2.3.2.1.8 Where can user get support if I encounter any issue ?      ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                  {
                    question: "4.2.3.2.2 Excel Analyzer",
                    answer:
                      "The Excel Analyzer is a tool that allows users to upload Excel files or data sheets and perform various data analysis tasks. It enables users to ask questions about their data, adjust the header row, and visualize the results using different types of charts and models. ",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.2.2.1 How to navigate Excel Analyzer ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Excel Analyzer `,
                      },
                      {
                        question:
                          "4.2.3.2.2.2 How user use the Excel Analyzer ?  ",
                        answer: `<b> Step 1:</b> Click on Browse files  
                                                <br/><b> Step 2:</b>Select excel data sheet form system 
                                                <br/><b> Step 3:</b>Click on open  
                                                <br/><b> Step 4:</b>Confirm or adjust the header row.   
                                                <br/><b> Step 5:</b>Start asking questions against the uploaded excel.  `,
                      },
                      {
                        question:
                          "4.2.3.2.2.3 How can I adjust the header row ?   ",
                        answer: `<b> Step 1:</b> After uploading your file,   
                                                <br/><b> Step 2:</b>navigate to the "Confirm or adjust the header row" section. 
                                                <br/><b> Step 3:</b>Specify which row should be treated as the header by entering the row number or clicking on + sign.  
                                                <br/><b> Step 4:</b>Press the Enter button to apply.  
                                                  `,
                      },
                      {
                        question:
                          "4.2.3.2.2.4 What type of questions can users ask ?    ",
                        answer: `You can ask a variety of questions related to your data, such as: 
                                                <b> Step 1:</b> What was the profit for the previous year 2016?   
                                                <br/><b> Step 2:</b>Can you give me a scatter plot? 
                                                <br/><b> Step 3:</b>Can you give me a histogram chart for this year’s profit?  
                                                <br/><b> Step 4:</b>Can you create a liner iteration model 
                                                <br/><b> Step 5:</b>Summarizing data (e.g., total sales, average price).  
                                                <br/><b> Step 6:</b>Filtering data (e.g., show all entries from 2020). 
                                                <br/><b> Step 7:</b>Comparing data (e.g., sales in Q1 vs. Q2). 
                                                <br/><b> Step 8:</b>Finding trends (e.g., sales trends over the past year). `,
                      },
                      {
                        question:
                          "4.2.3.2.2.5 What visualization options are available ?   ",
                        answer: `The Excel Analyzer offers several visualization options, including: 
                                                <b> Step 1:</b> Pie Chart: Ideal for showing the proportions of categories within a whole.    
                                                <br/><b> Step 2:</b>Histogram: Useful for displaying the distribution of numerical data. 
                                                <br/><b> Step 3:</b>Scatter Plot: Great for identifying relationships between two variables. 
                                                <br/><b> Step 4:</b>Linear Regression Model: Helps in predicting trends and making forecasts based on your data.  `,
                      },
                      {
                        question:
                          "4.2.3.2.2.6 What file formats are supported ?    ",
                        answer:
                          "The Excel Analyzer supports standard Excel file formats (.xls, .xlsx) and CSV files. Ensure that your data sheet is in a proper, standard readable format to avoid any issues during the upload and analysis process. ",
                      },
                      {
                        question:
                          "4.2.3.2.2.7 What support is available if a user encounter issues with Customer asset & security information?   ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                  {
                    question: "4.2.3.2.3 PDF Query System",
                    answer:
                      "The PDF Query System is a tool that allows user to search for specific text or metadata within an uploaded pymupdf PDF file format. It provides detailed information including the page number where the text was found, screen ID, the text on the page, and a screenshot of the page. ",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.2.3.1 How to navigate PDF Query System ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on PDF Query System `,
                      },
                      {
                        question:
                          "4.2.3.2.3.2 How user use the PDF Query system? ",
                        answer: `<b> Step 1:</b> Upload a PDF file with standard format of PyMuPDF. 
                                                <br/><b> Step 2:</b>Select query type metadata. 
                                                <br/><b> Step 3:</b>Select screenID.   
                                                <br/><b> Step 4:</b>Enter Instructions.  
                                                <br/><b> Step 5:</b>Click on Submit. 
                                                <br/> Or
                                                <br/><b> Step 2:</b>Select query type Text. 
                                                <br/><b> Step 3:</b>Enter Query Text.  
                                                `,
                      },
                      {
                        question:
                          "4.2.3.2.3.3 What information is included in the query results ? ",
                        answer: `<b> Step 1:</b> Page Number: The page where the searched text is found. 
                                                <br/><b> Step 2:</b>Screen ID: An identifier for the specific screen or page. 
                                                <br/><b> Step 3:</b>Page Text: The entire text content of the page where the query text is located.    
                                                <br/><b> Step 4:</b>Screenshot: An image capture of the page.   
                                                <br/><b> Step 5:</b>Instruction: Instruction form PDF	 `,
                      },
                      {
                        question:
                          "4.2.3.2.3.4 What if User encounter an error ? ",
                        answer: `If you run into issues, consider the following steps: 
                                              <br/>  <b> Step 1:</b> Check PDF: Ensure that the PDF file is in standard format. 
                                                <br/><b> Step 2:</b>Query Type: Verify that you have selected the correct query type (Text or Metadata). 
                                                <br/><b> Step 3:</b>Screen ID: Make sure you provide a screen ID if performing a metadata query.     
                                                <br/><b> Step 4:</b>File Format: Ensure that the uploaded file is a valid PDF document.  `,
                      },
                      {
                        question:
                          "4.2.3.2.3.5 Why user need a screen ID for metadata queries ? ",
                        answer:
                          "The screen ID is used to identify and retrieve specific metadata associated with the PDF file. It ensures that the query is accurately directed, and that the relevant information is returned. ",
                      },
                      {
                        question:
                          "4.2.3.2.3.6 How does the system process the queries ? ",
                        answer: `The system uses PyMuPDF to:
                                               <br/> <b> Step 1:</b> ext Queries: Search for text within the PDF, retrieve the page number, extract the page text, and capture a screenshot of the page.  
                                                <br/><b> Step 2:</b>Metadata Queries: Access and return metadata information for the PDF file based on the provided screen ID. `,
                      },
                      {
                        question:
                          "4.2.3.2.3.7 What support is available if a user encounter issues with Customer asset & security information?   ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                ],
              },
              {
                question: "4.2.3.3 RPA Services",
                answer:
                  "Comment Extractor,P&ID Extractor,Document Comparison,Complience Extractor",
                deepestNestedQuestions: [
                  {
                    question: "4.2.3.3.1 Comment Extractor",
                    answer:
                      "Comments Extractor is functionality that allows user to upload the document in pdf format only  ",

                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.3.1.1 How to navigate Comments Extractor ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Comments Extractor`,
                      },
                      {
                        question:
                          "4.2.3.3.1.2 How user use the comments extractor ?  ",
                        answer: `<b> Step 1:</b> Enter email address in To and CC field  
                                                <br/><b> Step 2:</b>Enter Email subject 
                                                <br/><b> Step 3:</b>Upload a pdf file for comment extractions  `,
                      },
                      {
                        question:
                          "4.2.3.3.1.3 What is a Comments Extractor ?  ",
                        answer:
                          "It is a tool that allows user to upload the PDF documents and extracts all the comments embedded in the file, presenting them in a readable format. ",
                      },
                      {
                        question:
                          "4.2.3.3.1.4 How to upload a PDF document ?  ",
                        answer:
                          "To upload a PDF document, click the 'Browse file' button on the extractor interface, select the PDF file from your device, and click 'Open'. The extractor will begin processing the document.  ",
                      },
                      {
                        question:
                          "4.2.3.3.1.5 What types of comments can the extractor handle ?   ",
                        answer:
                          "The extractor can handle comments embedded in a PDF, sticky notes and other comment types supported by PDF standards. ",
                      },
                      {
                        question:
                          "4.2.3.3.1.6 Are there any limitations on the file size or type ? ",
                        answer:
                          "Yes, the tool currently supports PDF files up to 200MB in size. It does not support other file formats like DOCX, TXT, or image files.  ",
                      },
                      {
                        question:
                          "4.2.3.3.1.7 How long does it take to extract comments from a PDF ?   ",
                        answer:
                          "The extraction time depends on the size and complexity of the PDF document. Typically, small to medium-sized documents are processed within a few seconds to a minute.   ",
                      },
                      {
                        question:
                          "4.2.3.3.1.8 How are the extracted comments displayed ?    ",
                        answer:
                          "Extracted comments are displayed in a list Excel format or in comments summary with the page number where the comment is located, User is having the option to download the comments in an Excel and PDF format.",
                      },
                      {
                        question:
                          "4.2.3.3.1.9 Can I send the via email with To and CC ?     ",
                        answer:
                          "Users can send the email by providing the recipient's email address in the 'To' field, CC email addresses (if any), and they can also add multiple emails by separating them with a semicolon at the end. They should include a subject line before sending. Additionally, users can schedule a call with the recipients listed in the 'To' and 'CC' fields. ",
                      },
                      {
                        question:
                          "4.2.3.3.1.10 What support is available if a user encounter issues with Customer asset & security information ?     ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },

                  {
                    question: "4.2.3.3.2 P&ID Extractor",
                    answer:
                      "The P&ID Extractor is a tool designed to help users extract PI (Piping and Instrumentation) numbers from PDF files into an Excel spreadsheet. Users can download the extracted data and add multiple files for processing.   ",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.3.1.1 How to navigate P&ID Extractor ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on P&ID Extractor `,
                      },
                      {
                        question:
                          "4.2.3.3.1.2 How user use the P & ID Extractor ?  ",
                        answer: `<b> Step 1:</b> Select the PDF files from which you want to extract PI numbers. You can add multiple files at once.  
                                                <br/><b> Step 2:</b>User will display with PI tags in preview  
                                                <br/><b> Step 3:</b>Click on download   `,
                      },
                      {
                        question:
                          "4.2.3.3.1.3 Is there a limit to the number of files I can upload ?  ",
                        answer:
                          "There is no specific limit to the number of files you can upload but be mindful that processing a large number of files may take longer. ",
                      },
                      {
                        question:
                          "4.2.3.3.1.4 What should user do if the extraction fails ?  ",
                        answer: `<b> Step 1:</b> The files you uploaded are in PDF format.
                                                <br/><b> Step 2:</b>The PDF files are not corrupted.  
                                                <br/><b> Step 3:</b>You have a stable internet connection.    `,
                      },
                      {
                        question:
                          "4.2.3.3.1.5 Can I extract PI numbers from scanned PDFs ?   ",
                        answer:
                          "The P&ID Extractor works best with digitally created PDFs. If your PDFs are scanned images, the extraction accuracy may be lower, and OCR (Optical Character Recognition) capabilities may be required. ",
                      },
                      {
                        question:
                          "4.2.3.3.1.6 Are there any limitations on the file size ?   ",
                        answer:
                          "Yes, the tool currently supports PDF files up to 200MB in size.  ",
                      },
                      {
                        question:
                          "4.2.3.3.1.7 What support is available if user encounter issues with Customer asset & security information ?    ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.   ",
                      },
                    ],
                  },
                  {
                    question: "4.2.3.3.3 Document Comparison",
                    answer:
                      "The Docs Comparison Tool allows you to compare PDF or text files to identify differences. This tool highlights what has changed, been added, or remains unchanged between two versions of a document, and it supports page-wise comparison.   ",

                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.3.3.1 How to navigate Docs Comparison ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Docs Comparison  `,
                      },
                      {
                        question:
                          "4.2.3.3.3.2 How user use the Docs comparison ?  ",
                        answer: `<b> Step 1:</b> Upload first file  
                                                <br/><b> Step 2:</b>Upload second file  
                                                <br/><b> Step 3:</b>After uploading user should displayed with both compared files page wise   `,
                      },
                      {
                        question:
                          "4.2.3.3.3.3 How are differences highlighted ?   ",
                        answer: ` <b> Red Highlights:</b> Text that appears in the old file but not in the new file.  
                                             <br/>  <b> Green Highlights: </b> Text that appears in the new file but not in the old file.   
                                             <br/>  <b> Black Text:</b> Text that is present in both files.    `,
                      },
                      {
                        question: "4.2.3.3.3.4 Page-wise Comparison:    ",
                        answer:
                          "User can compare documents on a page-by-page basis. ",
                      },
                      {
                        question:
                          "4.2.3.3.3.5 Can user download the comparison results ?    ",
                        answer: `Yes, user can download: 
                                               <br/> <b> Step 1:</b> The old file with highlights.  
                                                <br/><b> Step 2:</b> The new file with highlights.  
                                                <br/><b> Step 3:</b> A merged PDF showing all differences highlighted. `,
                      },
                      {
                        question:
                          "4.2.3.3.3.6 What file formats are supported ?   ",
                        answer:
                          "It supports PDF and plain text (.txt) files up to 200MB. ",
                      },
                      {
                        question:
                          "4.2.3.3.3.7 Can I compare more than two files at once ?    ",
                        answer:
                          "Currently, the tool supports comparison between only two files at a time.  ",
                      },
                      {
                        question:
                          "4.2.3.3.3.8 Does the tool support compare PDF and text files together ?    ",
                        answer:
                          "Yes, you can compare a PDF file with a text file. The tool will align the text content and    highlight the differences accordingly.  ",
                      },
                      {
                        question:
                          "4.2.3.3.3.9 What support is available if user encounter issues with Customer asset & security information ?  ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                  {
                    question: "4.2.3.3.4 Complience Extractor",
                    answer:
                      "Compliance Extractor is a tool that allows you to convert standard format PDF Standard Operating Procedure (SOP) documents into Excel sheets. This makes it easier to manage, analyse, and share SOP data. ",
                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.3.4.1 How to navigate Complience Extractor ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Complience Extractor `,
                      },
                      {
                        question:
                          "4.2.3.3.4.2 How user use the Compliance Extractor?  ",
                        answer: `<b> Step 1:</b> Upload PDF file  
                                                <br/><b> Step 2:</b>It will extract the data 
                                                <br/><b> Step 3:</b>Once the extraction is complete, download the Excel sheet  `,
                      },
                      {
                        question:
                          "4.2.3.3.4.3 What types of PDF SOP documents can Compliance Extractor handle ?  ",
                        answer:
                          "The Compliance Extractor can handle RFP or RFQ format PDF file. ",
                      },
                      {
                        question:
                          "4.2.3.3.4.4 Can I customize the output Excel sheet ?   ",
                        answer:
                          " Yes, the Excel sheet generated can be customized to fit your specific needs. You can      add, remove, or edit columns and rows as needed.  ",
                      },
                      {
                        question:
                          "4.2.3.3.4.5 What types of PDF SOP documents can Compliance Extractor handle ?  ",
                        answer: `If you notice any inaccuracies: 
                                                <br/><b> Step 1:</b>Review the original PDF: Ensure it is clear and well-structured & as per standard format. 
                                                <br/><b> Step 2:</b>Use the feedback function: Many tools have a feedback or error report function. Use this to report any issues. 
                                                <br/><b> Step 3:</b>Manual adjustments:  Manually adjust the Excel sheet as needed.  `,
                      },
                      {
                        question:
                          "4.2.3.3.4.6 Are there any limitations on the file size or type ?  ",
                        answer:
                          "Yes, the tool currently supports PDF files up to 200MB in size. It does not support other file formats like DOCX, TXT, or image files ",
                      },
                      {
                        question:
                          "4.2.3.3.4.7 What support is available if user encounter issues with Customer asset & security information ?  ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                ],
              },
              {
                question: "4.2.3.4 Security Services",
                answer: "Customer Asset & Security Information ",
                deepestNestedQuestions: [
                  {
                    question:
                      "4.2.3.4.1 Customer Asset & Security Information ",
                    answer:
                      "Customer Asset & Security Information is a functionality that allows a cybersecurity team to monitor and analyse user activity and vulnerabilities based on IP addresses. It uses AI to enhance security measures.  ",

                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.3.4.1 How to navigate Customer Asset & Security Information ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                                <br/><b> Step 4:</b>Click on Advance features  
                                                <br/><b> Step 5:</b>Click on Customer Asset & Security Information `,
                      },
                      {
                        question:
                          "4.2.3.4.4.2 How user use the Customer asset & security information ?  ",
                        answer: `Give prompt related to IP address which is already available in the elastic cloud 
                                                <br/> e.g.
                                               <br/> <b> Step 1:</b> What is the message summary for source IP ______?  
                                                <br/><b> Step 2:</b>What are the destination source IP ______? 
                                                <br/><b> Step 3:</b>What is the network application for the source IP ______?  `,
                      },
                      {
                        question:
                          "4.2.3.3.4.3 What support is available if user encounter issues with Customer asset & security information ?   ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team. ",
                      },
                    ],
                  },
                ],
              },
              {
                question: "4.2.3.5 Code Development Services/ Assistance",
                answer: "Code Generation and Debugging ",
                deepestNestedQuestions: [
                  {
                    question: "4.2.3.5.1 Code Generation and Debugging ",
                    answer:
                      "The Code Generator is a tool that allows you to automatically create code snippets or complete programs in various programming languages based on your specific requirements or by providing prompts  ",

                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.5.1.1 How to navigate Code Generation ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                        <br/><b> Step 2:</b>Log in with your organization credentials 
                                        <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                        <br/><b> Step 4:</b>Click on Advance features  
                                        <br/><b> Step 5:</b>Click on Code Generation `,
                      },
                      {
                        question:
                          "4.2.3.3.5.2 How user use the Code Generator ?   ",
                        answer: `
                                        <b> Step 1:</b> Provide details input that includes what the code should do functionality, variables, inputs/outputs, and any other specifics’  
                                        <br/><b> Step 2:</b>Click on Generate  
                                        <br/><b> Step 3:</b>Also read description along with generated code.
                                        
                                        
                                        `,
                      },
                      {
                        question:
                          "4.2.3.3.5.3 Which programming languages are supported ?    ",
                        answer:
                          "The Code Generator supports a wide range of languages, including but not limited to: Python, JavaScript, Java, C++, C#, PHP, Ruby, Swift, Kotlin, TypeScript, HTML/CSS,SQL.  ",
                      },
                      {
                        question:
                          "4.2.3.3.5.4 Can users generate entire programs or just snippets ?     ",
                        answer:
                          "The Code Generator can create both complete programs and individual code snippets, depending on your needs. For instance, you can generate functions, classes, modules, or full applications.  ",
                      },
                      {
                        question:
                          "4.2.3.3.5.5 Is the generated code optimized ?     ",
                        answer:
                          "The generated code is designed to be functional and follows standard programming practices. However, further optimization may be required depending on the specific use case and performance requirements.  ",
                      },
                      {
                        question:
                          "4.2.3.3.5.6 How accurate is the generated code ?       ",
                        answer:
                          "The accuracy of the generated code depends on the clarity and detail of the input requirements you provide. While the Code Generator strives to produce high-quality and functional code, it is recommended to review and test the generated code to ensure it meets your expectations.  ",
                      },
                      {
                        question:
                          "4.2.3.3.5.7 Is there a limit to how much code I can generate ?       ",
                        answer:
                          "There are no strict limits on the amount of code you can generate, but for best performance, it is recommended to generate code in manageable segments, especially for large and complex projects.   ",
                      },
                      {
                        question:
                          "4.2.3.3.5.8 Can the Code Generator integrate with my existing development tools ?      ",
                        answer:
                          "The generated code can be easily copied and pasted into your preferred development environment. While direct integration with development tools may not be available, the code is designed to be compatible with standard IDEs and text editors. ",
                      },
                      {
                        question:
                          "4.2.3.3.5.9 How does the description feature work ?      ",
                        answer:
                          "Along with the generated code, a description will be provided. This description explains what the code does, outlines its key components, and provides context for better understanding. This can be particularly helpful for complex code or when integrating the generated code into existing projects.  ",
                      },
                      {
                        question:
                          "4.2.3.3.5.10 What support is available if a user encounter issues with Customer asset & security information ?       ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.   ",
                      },
                    ],
                  },
                ],
              },
              {
                question: "4.2.3.6 Image/ Video Recognition Services",
                answer: "Personal Protective Equipment ",
                deepestNestedQuestions: [
                  {
                    question: "4.2.3.6.1 Personal Protective Equipment ",
                    answer:
                      "PPE Object Detection is a functionality that allows users to detect personal protective equipment such as masks, hard hats, and safety vests in images or videos. This technology helps ensure compliance with safety standards by identifying and counting the presence of required safety gear.  ",

                    finalNestedQuestions: [
                      {
                        question:
                          "4.2.3.5.6.1 How to navigate Personal Protective Equipment ? ",
                        answer: `<b> Step 1:</b> Navigate to https://y-chatbotgpt.azurewebsites.net/  
                                <br/><b> Step 2:</b>Log in with your organization credentials 
                                <br/><b> Step 3:</b>Click on Action oriented functionalities  
                                <br/><b> Step 4:</b>Click on Advance features  
                                <br/><b> Step 5:</b>Click on Personal Protective Equipment `,
                      },
                      {
                        question:
                          "4.2.3.5.6.2 How user use the Personal Protective Equipment??  ",
                        answer: `
                                <b> Step 1:</b> Select detection type image or video. 
                                <br/><b> Step 2:</b>Click on browse files. `,
                      },
                      {
                        question:
                          "4.2.3.5.6.3 What types of PPE can be detected ?   ",
                        answer: `
                                <b>1:</b> Masks 
                                <br/><b>2:</b> Hard Hats 
                                <br/><b>2:</b> Safety Vests  `,
                      },
                      {
                        question:
                          "4.2.3.5.6.4 How accurate is the detection ?    ",
                        answer:
                          "The accuracy of PPE detection depends on several factors, including the quality of the uploaded media and the visibility of the PPE items. The system uses advanced machine learning algorithms to ensure high accuracy, but results may vary in challenging conditions. ",
                      },
                      {
                        question:
                          "4.2.3.5.6.5 Can the tool handle multiple people in an image or video ?    ",
                        answer: `Yes, the system is designed to detect PPE on multiple individuals within the same image or video. Each detected item is counted and displayed in the results table. 
                               <br/> <b>1:</b> Normal Class: All required PPE items (mask, hard hat, vest) are worn.   
                                <br/><b>2:</b>Anomaly Classes: Missing one or more required PPE items (e.g., no hard hat, no safety vest, no mask).
                                <br/><b>3:</b>Frame-by-Frame Analysis (Video): For videos, the system extracts frame every second and performs detection on each frame.  
                                <br/><b>4:</b>Live Results: The results are updated live in a table format, showing the count and classification for each frame.  
                               
                                `,
                      },
                      {
                        question:
                          "4.2.3.5.6.6 What kind of output can I expect ?    ",
                        answer: `After processing, the system will provide: 
                               <br/> <b>1:</b> A visual preview with detected PPE items highlighted.    
                                <br/><b>2:</b>A classification label indicating whether the image/video is "Normal" or an "Anomaly" with specific missing items (e.g., "No Hard Hat", "No Safety Vest", "No Mask"). 
                                <br/><b>3:</b>A table displaying the count of each type of detected PPE item (masks, hard hats, safety vests). 
                                <br/><b>4:</b>For Videos: Live results showing frame-by-frame analysis in a table format, updated every second. 
                               
                                `,
                      },
                      {
                        question:
                          "4.2.3.5.6.7 Is there a limit or format to the file size I can upload ?     ",
                        answer:
                          "Yes, there may be a file size limit for uploads to ensure quick and efficient processing. Image 200MB JPG, JPEG, PNG Video 200MB MP4, AVI, MOV, MKV, MPEG4 ",
                      },
                      {
                        question:
                          "4.2.3.5.6.8 What support is available if a user encounter issues with Customer asset & security information ?     ",
                        answer:
                          "If you are facing any technical issue, please contact with <b>Y-ChatGPT</b> team.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    question: "5. Where do I ask questions related to coding and debugging?",
    answer: ` <b>Assist Bot-</b> “Other Assistance” will help in debugging and provide code snippets.`,
  },
  {
    question:
      "6. My question is related to Yokogawa products and services, where should I ask them?",
    answer:
      " If the question is specific to Yokogawa products and services, policies, and related to Cyberdoc you can give prompts in Internal search will give detailed information.",
  },
  {
    question:
      "7. What if the question I asked related to Yokogawa on internal search is not giving desired response?",
    answer:
      " When a user does not receive a response internally, they should share the SharePoint link with us. The Y-ChatGPT backend team will then integrate these links with the Internal feature, enabling users to engage in specific document-related conversations by providing relevant prompts.",
  },
  {
    question:
      "8. What is the file format that can be used for “Translate your docs”?",
    answer: " PDF, DOCX, TXT, PPTX, CSV, XLSX files can be uploaded.",
  },
  {
    question:
      "9. Suppose if user upload .pdf, .docx and .txt file in “Chat with your data” feature? What prompts should you give?",
    answer: ` User are allowed to give prompts like this for e.g.,
        <br />
        <b> Example 1:</b> What is this document about?
        <br />
        <b>  Example 2:</b> Can you please summarize this document?
        <br />
        <b>  Example 3:</b> Whose information is this about?
        <br />
        Consider prompts that align more closely with the intended use of the 'Chat with your data' feature.
        <br />
        <b><u> Note: </u></b> Users are advised against providing inadequate prompts, as this may not yield the desired response and potentially affect the quality of responses received.`,
  },
];

export default Faq;
